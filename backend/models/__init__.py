from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User, Photo, Sketchbook, Board
# from .sketchbooks import Sketchbook, Board
