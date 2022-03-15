from .db import db
from datetime import datetime

class Artist(db.Model):
    __tablename__ = 'artists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    albums = db.relationship('Album', back_populates='artist')
    songs = db.relationship('Song', back_populates='artist')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
