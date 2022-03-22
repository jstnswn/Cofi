from random import randint
from app.models import db, User, Song
from app.seeds.users import users
from app.seeds.songs import songs

def add_songs_to_playlist(playlist):
    for song in songs:
        flip = randint(0, 6)

        if flip == 1:
            playlist.songs.append(song)
