from flask import Flask
from .models import db
from .routes import main

def create_app():
    app = Flask(__name__)

    import os

    basedir = os.path.abspath(os.path.dirname(__file__))

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'applications.db')    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    app.register_blueprint(main)

    # 🔥 ADD THIS BLOCK HERE
    with app.app_context():
        db.create_all()

    return app