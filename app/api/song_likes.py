from flask import Blueprint, request
from flask_login import current_user
from app.models import Song, db, User
from app.forms.song_form import SongForm

song_like_routes = Blueprint('song_likes', __name__)

@song_like_routes.route('', methods=['POST'])
def like_album():
    data = request.json
    from_user_id = current_user.get_id()
    song_id = data['song_id']

    from_user = User.query.get(from_user_id)
    song = Song.query.get(song_id)

    song.likers.append(from_user)

    db.session.commit()
    return {'user': from_user.to_dict()}, 200

@song_like_routes.route('', methods=['DELETE'])
def unlike_song():
    data = request.json
    user_from_id = current_user.get_id()
    song_id = data['song_id']

    from_user = User.query.get(user_from_id)
    song = Song.query.get(song_id)

    song.likers.remove(from_user)

    db.session.commit()
    return {'from_user_id': from_user.to_dict(), 'song_id': song_id}, 204