from flask import Blueprint
from app.models import Song
from random import randint

song_routes = Blueprint('songs', __name__)

@song_routes.route('/new/<int:limit>')
def get_new_songs(limit):
    songs = Song.query.filter(Song.private==False).order_by(
        Song.id.desc()).limit(limit).all()

    if not songs:
        return {'error': 'Unable to get songs from the database'}

    return {'songs': [song.to_dict() for song in songs]}

@song_routes.route('/featured')
def get_featured_songs():
    """
    returns 3 random songs from 10 most recent singles (no album association)
    """

    # Songs without track numbers don't belong to albums
    songs = Song.query.filter(Song.track_number==None).order_by(
        Song.id.desc()).limit(3).all()

    if not songs:
        return {'error': 'Unable to get songs from the database'}

    num_of_songs = len(songs)
    featured_songs = []
    max_songs = None

    if len(songs) < 3:
        max_songs = len(songs)
    else:
        max_songs = 3

    number_cashe = []
    while len(featured_songs) < max_songs and len(number_cashe) < num_of_songs:
        idx = randint(0, num_of_songs - 1)
        if idx not in number_cashe:
            featured_songs.append(songs[idx])
            number_cashe.append(idx)

    return {'songs': [song.to_dict() for song in featured_songs]}
