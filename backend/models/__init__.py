from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User, Photo, Folder, Board
# from .folders import Folder, Board
