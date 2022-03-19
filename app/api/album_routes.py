from dataclasses import dataclass
from app.api.utils import get_or_make_artist_id
from flask import Blueprint, request
from flask_login import current_user
from random import randint
from app.models import Album, db
from app.forms.album_form import AlbumForm
from app.api.auth_routes import validation_errors_to_error_messages

album_routes = Blueprint('albums', __name__)


@album_routes.route('/featured')
def get_featured_album():
    """
    Returns a random album from 10 most recent
    """
    id = randint(1, 10)
    album = Album.query.get(id)

    if not album:
        return {'error': 'Unable to get album from database'}

    return {'album': album.to_dict()}


@album_routes.route('/new/<int:limit>')
def get_new_albums(limit):
    """
    Returns array of most new albums. Can specify the amount via limit
    """
    albums = Album.query.order_by(Album.id.desc()).limit(limit).all()

    if not albums:
        return {'error': 'Unable to get albums from the database'}

    return {'albums': [album.to_dict() for album in albums]}


@album_routes.route('/top/<int:limit>')
def get_most_liked_albums(limit):
    """
    Returns list of most liked albums. Can specify the amount via limit
    """

    albums = Album.query.order_by(Album.likers.count().desc()).limit(5).all()

    return {'albums': [album.to_dict() for album in albums]}

@album_routes.route('/current_user')
def get_user_albums():
    current_user_id = current_user.get_id()

    albums = Album.query.filter(Album.user_id==current_user_id).order_by(Album.id.desc()).all()

    if not albums:
        return {'error': 'No albums were found'}, 400

    return {'albums': [album.to_dict() for album in albums]}, 200


@album_routes.route('', methods=['POST'])
def create_album():
    current_user_id = current_user.get_id()

    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        artist_id = get_or_make_artist_id(form.artist.data)

        album = Album(
            user_id = current_user_id,
            title = form.title.data,
            private = form.private.data,
            image_url = form.image_url.data,
            artist_id = artist_id
        )

        db.session.add(album)
        db.session.commit()

        return {'album': album.to_dict()}, 200


    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
