from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .song_favorites import song_favorites
from .album_favorites import album_favorites

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    albums = db.relationship('Album', back_populates='user')
    songs = db.relationship('Song', back_populates='user')
    favorite_songs = db.relationship('Song', back_populates='fav_users', secondary=song_favorites)
    favorite_albums = db.relationship('Album', back_populates='fav_users', secondary=album_favorites)

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
            'liked_song_ids': [song.id for song in self.songs]
            # 'liked_songs': self.liked_songs
        }
