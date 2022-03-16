from flask import Blueprint
from random import randint
from app.models import Album

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
    albums = Album.query.all()

    if not albums:
        return {'error': 'Unable to get albums from the database'}

    return {'albums': [album.to_dict() for album in albums]}
