from .db import db
from datetime import datetime

album_likes = db.Table(
    'album_likes',
    db.Column('from_user_id', db.Integer, db.ForeignKey(
        'users.id'), primary_key=True),
    db.Column('album_id', db.Integer, db.ForeignKey(
        'albums.id'), primary_key=True)
)
