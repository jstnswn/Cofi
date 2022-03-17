from flask import Blueprint
from sqlalchemy import func
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
    """
    Returns array of most new albums. Can specify the amount via limit
    """
    albums = Album.query.limit(limit).all()

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
