from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from schemas import RegisterSchema, LoginSchema
import services


auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        user_data = request.get_json()
        data = RegisterSchema().load(user_data)

        # Hashear la password ingresada por el usuario
        hashed_password = generate_password_hash(data["password"])

        # Crear nuevo usuario
        new_user = services.insert_user(
            username=data["username"],
            email=data["email"],
            rol=data["rol"],
            password_hash=hashed_password,
        )

        return jsonify({"message": "Usuario creado", "user": new_user}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        user_data = request.get_json()
        data = LoginSchema().load(user_data)

        # Verificar si existe el usuario
        user = services.get_user_by_email(data["email"])
        if not user:
            return jsonify({"message": "Usuario no encontrado"}), 404

        # Verificar la password ingresada con las guardas en la db
        if not check_password_hash(user["password"], data["password"]):
            return jsonify({"message": "Contraseña incorrecta"}), 401

        # Agregar JWT para mejor seguridad en las sessiones de usuario
        return jsonify({"message": "Login exitoso", "user": user["username"]})

    except Exception as e:
        return jsonify({"message": str(e)}), 400
