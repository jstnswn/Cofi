from .db import db
from datetime import datetime

song_favorites = db.Table(
    'song_favorites',
    db.Column('user_from_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('song_id', db.Integer, db.ForeignKey('songs.id'), primary_key=True)
)
