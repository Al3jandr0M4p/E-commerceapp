from flask import Flask
from modules.auth.routes import auth_bp
from modules.categories.routes import categories_bp
from modules.orders.routes import orders_bp
from modules.products.routes import products_bp
from modules.stores.routes import stores_bp
from modules.users.routes import user_bp


def create_app():
    app = Flask()
    app.config["SECRET_KEY"] = "secret_key"

    # Register of blueprints (modules)
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(categories_bp, url_prefix="/api/categories")
    app.register_blueprint(orders_bp, url_prefix="/api/orders")
    app.register_blueprint(products_bp, url_prefix="/api/products")
    app.register_blueprint(stores_bp, url_prefix="/api/stores")
    app.register_blueprint(user_bp, url_prefix="/api/user")

    return app
