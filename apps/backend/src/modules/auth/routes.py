import random
from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash

from common import utils
from .schemas import RegisterSchema, LoginSchema
from .services import (
    get_user_by_email,
    insert_user,
    save_reset_code,
    verify_reset_code,
    update_password,
)


auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        user_data = request.get_json()
        print(user_data)
        data = RegisterSchema().load(user_data)

        # Hashear la password ingresada por el usuario
        hashed_password = generate_password_hash(data["password"])

        # Crear nuevo usuario
        new_user = insert_user(
            username=data["username"],
            email=data["email"],
            hashed_password=hashed_password,
        )

        return (
            jsonify({"message": "Usuario creado", "user": new_user}),
            201,
        )

    except Exception as e:
        return jsonify({"message": str(e)}), 400


@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        user_data = request.get_json()
        data = LoginSchema().load(user_data)

        # Verificar si existe el usuario
        user = get_user_by_email(data["email"])
        if not user:
            return jsonify({"message": "Usuario no encontrado"}), 404

        # Verificar la password ingresada con las guardas en la db
        if not check_password_hash(user["password"], data["password"]):
            return jsonify({"message": "Contraseña incorrecta"}), 401

        # Agregar JWT para mejor seguridad en las sessiones de usuario
        return (
            jsonify(
                {
                    "message": "Login exitoso",
                    "user": user["username"],
                    "type_account": user["type_account"],
                }
            ),
            200,
        )

    except Exception as e:
        return jsonify({"message": str(e)}), 400


@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    try:
        data = request.get_json()
        email = data.get("email")

        user = get_user_by_email(email)
        if not user:
            return jsonify({"message": "Email no encontrado"}), 404

        # Generar y guardar un codigo
        code = str(random.randint(100000, 999999))
        save_reset_code(email, code)

        # Enviar el codigo
        utils.send_code(email, code)

        return jsonify({"message": "Codigo enviado al email"}), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 400


@auth_bp.route("/verify-reset-code", methods=["POST"])
def verify_reset_code_route():
    try:
        data = request.get_json()
        email = data.get("email")
        code = data.get("code")

        if verify_reset_code(email, code):
            return jsonify({"message": "Codigo valido"}), 200
        else:
            return jsonify({"message": "Codigo invalido o experido"}), 400
    except Exception as e:
        return jsonify({"message": str(e)}), 400


@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():
    try:
        data = request.get_json()
        email = data.get("email")
        new_password = data.get("new_password")
        code = data.get("code")

        if not verify_reset_code(email, code):
            return jsonify({"message": "Codigo invalido"}), 400

        hashed_password = generate_password_hash(new_password)
        update_password(email, hashed_password)

        return jsonify({"message": "Contraseña actualizada"}), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 400
