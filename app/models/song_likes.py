from .db import db
from datetime import datetime

song_likes = db.Table(
    'song_likes',
    db.Column('from_user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('song_id', db.Integer, db.ForeignKey('songs.id'), primary_key=True)
)
