from flask import Flask ,session
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager
from datetime import timedelta

db = SQLAlchemy()
DB_Name = "database.db"

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "qwerty"
    app.permanent_session_lifetime=timedelta(minutes=5)
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_Name}"
    db.init_app(app)

    # Import and register blueprints
    from .veiws import veiws
    from .auth import auth
    app.register_blueprint( veiws, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    # Import models
    from .models import User  # assuming your model is named User

    create_database(app)
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))


    return app

def create_database(app):
     if not path.exists(DB_Name):
        with app.app_context():
            db.create_all()
        print("Database created!")
