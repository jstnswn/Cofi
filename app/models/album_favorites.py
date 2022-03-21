from .db import db
from datetime import datetime

album_favorites = db.Table(
    'album_favorites',
    db.Column('user_from_id', db.Integer, db.ForeignKey(
        'users.id'), primary_key=True),
    db.Column('album_id', db.Integer, db.ForeignKey(
        'albums.id'), primary_key=True)
)
