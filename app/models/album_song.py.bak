from .db import db

album_songs = db.Table(
    'album_songs',
    db.Column('album_id', db.Integer, db.ForeignKey(
        'albums.id'), primary_key=True),
    db.Column('song_id', db.Integer, db.ForeignKey(
        'songs.id'), primary_key=True)
)
