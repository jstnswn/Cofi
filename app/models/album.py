from .db import db
from datetime import datetime

class Album(db.Model):
    __tablename__ = 'albums'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    image_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship('User', back_populates='albums')
    artist = db.relationship('Artist', back_populates='albums')
    songs = db.relationship('Song', back_populates='album', cascade='all, delete-orphan')
