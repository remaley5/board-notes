#import the model you need to add the photo url to
import os
from backend.models import Photo, Board, db
from flask import Blueprint, request, jsonify
from ..aws import upload_file_to_s3, change_name

photo_routes = Blueprint('photo_routes', __name__)

@photo_routes.route("/<int:userId>", methods=['POST'])
def upload(userId):
    print( userId, '<----------------------USERID')
    f = request.files['file']
    f.filename = change_name(f.filename)
    photo_url = upload_file_to_s3(f, 'sophie-boards-bucket')
    if f:
        try:
            photo = Photo(
                user_id=userId, photo_url=photo_url)
            db.session.add(photo)
            db.session.commit()
            print(photo.to_dict(), '<--------------------PHOTO')
            return {'photo': photo.to_dict()}
        except AssertionError as message:
            return jsonify({"error": str(message)}), 400
    else:
        print('something went wrong-----------------')

@photo_routes.route("/sketchbook/<int:sketchbookId>", methods=['POST'])
def uploadBoard(sketchbookId):
    f = request.files['file']
    title = request.form['title']
    print('TITLE-----------------', title)
    f.filename = change_name(f.filename)
    photo_url = upload_file_to_s3(f, 'sophie-boards-bucket')
    if f:
        try:
            board = Board(
                sketchbook_id=sketchbookId, title=title, photo_url=photo_url)
            db.session.add(board)
            db.session.commit()

            return {'board': board.to_dict()}
        except AssertionError as message:
            return jsonify({"error": str(message)}), 400
    else:
        print('something went wrong-----------------')

@photo_routes.route("/<int:userId>")
def get_photos(userId):
    photos = Photo.query.filter(Photo.user_id == userId)
    photos = [p.to_dict() for p in photos]
    return jsonify(photos)
