from flask import Blueprint, request
from flask_login import current_user
from app.models import Song, Artist, db, song
from app.forms.song_form import SongForm
from random import randint
from app.aws import (
    upload_file_to_s3, allowed_image_file, allowed_song_file, get_unique_filename)
from .utils import get_or_make_artist_id

song_routes = Blueprint('songs', __name__)

@song_routes.route('/current_user')
def get_current_users_songs():
    current_user_id = current_user.get_id()
    songs = Song.query.filter(Song.user_id==current_user_id).order_by(Song.id.desc()).all()

    if not songs:
        return {'error': 'Unable to get songs from the database'}, 400

    return {'songs': [song.to_dict() for song in songs]}, 200


@song_routes.route('/new/<int:limit>')
def get_new_songs(limit):
    songs = Song.query.filter(Song.private==False).order_by(
        Song.id.desc()).limit(limit).all()

    if not songs:
        return {'error': 'Unable to get songs from the database'}, 400

    return {'songs': [song.to_dict() for song in songs]}, 200

@song_routes.route('/featured')
def get_featured_songs():
    """
    First returns 3 random songs from 10 most recent singles (no album association).
    If all tracks are associated with albums, returns 3 random from all recent.
    """

    # Songs without track numbers don't belong to albums
    songs = Song.query.filter(Song.track_number==None).order_by(
        Song.id.desc()).limit(10).all()

    if type(songs) is list:
        if len(songs) is 0:
            songs = Song.query.order_by(Song.id.desc()).limit(10).all()

    if not songs:
        return {'error': 'Could not retreive songs from the database.'}, 500


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

    return {'songs': [song.to_dict() for song in featured_songs]}, 200


@song_routes.route('', methods=['POST'])
def upload_song():

    form = SongForm()
    current_user_id = current_user.get_id()
    artist_id = get_or_make_artist_id(form.artist.data)
    image_url = (form.image_url.data
    if form.image_url.data
    else 'https://cofi-bucket.s3.amazonaws.com/art-seeds/song_cover.png')

    # Song upload
    if 'song' not in request.files:
        return {'errors': 'song required'}, 400

    song = request.files['song']

    if not allowed_song_file(song.filename):
        return {'errors': 'file type not permitted'}, 400

    song.filename = get_unique_filename(song.filename)

    song_upload = upload_file_to_s3(song)

    if 'url' not in song_upload:
        return song_upload, 400

    song_url = song_upload['url']


    new_song = Song(
        title=form.title.data,
        user_id=current_user_id,
        artist_id=artist_id,
        song_url=song_url,
        image_url=image_url
    )

    db.session.add(new_song)
    db.session.commit()


    return {'song': new_song.to_dict()}, 200


@song_routes.route('/<int:song_id>', methods=['DELETE'])
def delte_song(song_id):
    song = Song.query.get(song_id)

    # if not song:
    #     return {'error': 'Song to deleted was not found.'}, 400

    db.session.delete(song)
    db.session.commit()

    return {'response': 'Song deleted.'}, 204
