from flask import Blueprint, redirect, render_template, url_for, request
from backend.models import Folder, Board, db
folder_routes = Blueprint('folder_routes', __name__)
import json


@folder_routes.route("/new/<int:userId>", methods=['POST'])
def createNewFolder(userId):
    data = json.loads(request.data)
    folder = Folder(user_id=userId, title=data['title'], color=data['color'], description=data['description'])
    db.session.add(folder)
    db.session.commit()
    return folder.to_dict()

@folder_routes.route('/<int:userId>', methods=['GET'])
def getFolders(userId):
    folders = Folder.query.filter(Folder.user_id==userId)
    folders = [folder.to_dict() for folder in folders]
    print(folders)
    return {'folders': folders}

@folder_routes.route('/boards/<int:folderId>', methods=['GET'])
def getBoards(folderId):
    boards = Board.query.filter(Board.folder_id==folderId)
    boards = [board.to_dict() for board in boards]
    print(boards)
    return {'boards': boards}
