from backend.models import User, Photo, SketchBook, Board
from backend import app, db
from dotenv import load_dotenv


with app.app_context():
    db.drop_all()
    db.create_all()

    ian = User(first_name='Ian', last_name='Smith', email='ian@aa.io',
               password='password')

    db.session.add(ian)

    sketchbook_one = SketchBook(user_id=1, title='chairs', color='#f9e1b8', description='inspiration and thought maps for chair designs')
    sketchbook_two = SketchBook(user_id=1, title='tester', color='#cadae8', description='open me up and add some boards!')

    db.session.add(sketchbook_one)
    db.session.add(sketchbook_two)

    photo_one = Photo(user_id=1, photo_url='https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/ThuDec171111392020.png')
    photo_two = Photo(user_id=1, photo_url='https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/ThuDec171111442020.png')
    photo_three = Photo(user_id=1, photo_url='https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/ThuDec171111492020.png')
    photo_four = Photo(user_id=1, photo_url='https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/ThuDec171111532020.png')

    db.session.add(photo_one)
    db.session.add(photo_two)
    db.session.add(photo_three)
    db.session.add(photo_four)

    board_one = Board(sketchbook_id=1, photo_url='https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/ThuDec171112412020.png', title='tester board')

    db.session.add(board_one)

    db.session.commit()
