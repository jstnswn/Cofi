from app.models import db, Playlist
from .playlist_songs import add_songs_to_playlist

playlists = [
    Playlist(#1
        title='Study Mix',
        user_id=1,
    ),
    Playlist(#2
        title='Eazy Steezy',
        user_id=1,
    ),
    Playlist(#3
        title='Ambient',
        user_id=1,
    ),
    Playlist(#4
        title='Music to Walk to',
        user_id=1,
    ),
    Playlist(#5
        title='Sleepy',
        user_id=1,
    ),
]

def seed_playlists():
    for playlist in playlists:
        # Add random songs to playlist
        add_songs_to_playlist(playlist)

        db.session.add(playlist)

    db.session.commit()

def undo_playlists():
    db.session.execute('TRUNCATE playlists RESTART IDENTITY CASCADE;')
    db.session.commit()
