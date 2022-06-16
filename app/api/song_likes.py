from flask import Blueprint
from flask_login import current_user
from app.models import Song, db, User

song_like_routes = Blueprint('song_likes', __name__)

@song_like_routes.route('/songs/<int:song_id>', methods=['POST'])
def like_album(song_id):
    from_user_id = current_user.get_id()

    from_user = User.query.get(from_user_id)
    song = Song.query.get(song_id)

    song.likers.append(from_user)

    db.session.commit()
    return {'from_user_id': from_user.to_dict(), 'song_id': song_id}, 200

@song_like_routes.route('/songs/<int:song_id>', methods=['DELETE'])
def unlike_song(song_id):
    user_from_id = current_user.get_id()

    from_user = User.query.get(user_from_id)
    song = Song.query.get(song_id)

    song.likers.remove(from_user)

    db.session.commit()
    return {'from_user_id': from_user.to_dict(), 'song_id': song_id}, 204
