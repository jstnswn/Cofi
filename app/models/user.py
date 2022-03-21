from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .song_likes import song_likes
from .album_likes import album_likes

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    albums = db.relationship('Album', back_populates='user')
    songs = db.relationship('Song', back_populates='user')
    liked_songs = db.relationship('Song', back_populates='likers', secondary=song_likes)
    liked_albums = db.relationship('Album', back_populates='likers', secondary=album_likes)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def s_to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            # 'email': self.email
        }

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'albums': [album.u_to_dict() for album in self.albums],
            # 'songs': [song.to_dict() for song in self.songs],
            'liked_song_ids': [song.id for song in self.liked_songs],
            'liked_album_ids': [album.id for album in self.liked_albums]
            # 'liked_songs': self.liked_songs
        }
