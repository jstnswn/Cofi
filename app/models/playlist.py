from .db import db
from datetime import datetime
from .playlist_songs import playlist_songs

class Playlist(db.Model):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(35), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    private = db.Column(db.Boolean, default=False)
    image_url = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship('User', back_populates='playlists')
    songs = db.relationship('Song', back_populates='playlists', secondary=playlist_songs)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'songs': [song.a_to_dict() for song in self.songs],
            'song_ids': [song.id for song in self.songs],
            'image_url': self.image_url
        }
