from .db import db
from datetime import datetime
from .album_song import album_songs
from .album_like import album_likes

class Album(db.Model):
    __tablename__ = 'albums'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    image_url = db.Column(db.String(500))
    private = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship('User', back_populates='albums')
    artist = db.relationship('Artist', back_populates='albums')
    songs = db.relationship('Song', back_populates='albums',
                            secondary=album_songs, cascade='all, delete-orphan', single_parent=True)
    likers = db.relationship('User', back_populates='liked_albums', secondary=album_likes)

    # for songs
    def s_to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'artist': self.artist.to_dict()
        }

    # for user
    def u_to_dict(self):
        return {
            'id': self.id,
            'title': self.title
        }

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'artist': self.artist.to_dict(),
            'songs': [song.a_to_dict() for song in self.songs],
            'user': self.user.s_to_dict(),
            'image_url': self.image_url,
            'private': self.private
        }
