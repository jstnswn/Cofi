from flask import Blueprint
from flask_login import current_user
from app.models import Album, User, db


album_like_routes = Blueprint('album_likes', __name__)

@album_like_routes.route('/albums/<int:album_id>', methods=['POST'])
def like_album(album_id):
    from_user_id = current_user.get_id()

    from_user = User.query.get(from_user_id)
    album = Album.query.get(album_id)

    album.likers.append(from_user)

    db.session.commit()
    return {'user': from_user.to_dict()}, 200

@album_like_routes.route('/albums/<int:album_id>', methods=['DELETE'])
def unlike_album(album_id):
    user_from_id = current_user.get_id()

    from_user = User.query.get(user_from_id)
    album = Album.query.get(album_id)

    album.likers.remove(from_user)

    db.session.commit()
    return {'from_user_id': from_user.to_dict(), 'album_id': album_id}, 204
