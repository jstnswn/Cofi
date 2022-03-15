from .db import db
from datetime import datetime
from .song_like import song_likes

class Song(db.Model):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'))
    song_url = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String)
    track_number = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship('User', back_populates='songs')
    artist = db.relationship('Artist', back_populates='songs')
    album = db.relationship('Album', back_populates='songs')
    likers = db.relationship('User', back_populates='liked_songs', secondary=song_likes)
