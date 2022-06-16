from flask import Blueprint, request
from flask_login import current_user
from flask import Blueprint
from app.models import Song, db, Playlist
from app.forms.playlist_form import PlaylistForm
from app.api.auth_routes import validation_errors_to_error_messages

playlist_routes = Blueprint('playlists', __name__)

@playlist_routes.route('')
def get_user_playlists():
    current_user_id = current_user.get_id()

    playlists = Playlist.query.filter(Playlist.user_id==current_user_id).order_by(Playlist.id.desc()).all()

    if not playlists:
        return {'error': 'Unable to get playlists from the database'}, 400

    return {'playlists': [playlist.to_dict() for playlist in playlists]}, 200

@playlist_routes.route('', methods=['POST'])
def make_playlist():
    current_user_id = current_user.get_id()
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        playlist = Playlist(
            title=form.title.data,
            user_id=current_user_id,
            private=form.private.data,
            image_url=form.image_url.data
        )

        db.session.add(playlist)
        db.session.commit()

        return {'playlist': playlist.to_dict()}, 200

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@playlist_routes.route('/<int:playlist_id>/songs/<int:song_id>', methods=['POST'])
def add_song_to_playlist(playlist_id, song_id):
    playlist = Playlist.query.get(playlist_id)
    song = Song.query.get(song_id)

    if not playlist or not song:
        return {'error': 'Unable to reach the database'}, 400

    playlist.songs.append(song)

    db.session.commit()
    return {'playlist': playlist.to_dict()}, 200


@playlist_routes.route('/<int:playlist_id>', methods=['PATCH'])
def patch_playlist(playlist_id):
    playlist = Playlist.query.get(playlist_id)

    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        playlist.title = form.title.data
        playlist.private = form.private.data

        if form.image_url.data:
            playlist.image_url = form.image_url.data

        db.session.commit()

        return {'playlist': playlist.to_dict()}, 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@playlist_routes.route('/<int:playlist_id>/songs/<int:song_id>', methods=['DELETE'])
def remove_song_from_playlist(playlist_id, song_id):
    playlist = Playlist.query.get(playlist_id)
    song = Song.query.get(song_id)

    if not playlist or not song:
        return {'error': 'Unable to reach the database'}, 400

    playlist.songs.remove(song)

    db.session.commit()
    return {'playlist': playlist.to_dict()}, 200

@playlist_routes.route('/<int:playlist_id>', methods=['DELETE'])
def delete_playlist(playlist_id):
    playlist = Playlist.query.get(playlist_id)

    db.session.delete(playlist)
    db.session.commit()

    return {'response': 'Playlist deleted.'}, 204
