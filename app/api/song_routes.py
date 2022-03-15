from flask import Blueprint
from app.models import Song

song_routes = Blueprint('songs', __name__)

@song_routes.route('/new/<int:amount>')
def get_15_new_songs(amount):
    songs = Song.query.filter(Song.private==False).order_by(Song.id.desc()).limit(amount).all()

    if not songs:
        return {'error': 'Unable to get songs from database'}

    return {'songs': [song.to_dict() for song in songs]}
