from random import randint
from app.models import db, User, Song
from app.seeds.users import users

def add_favorites_to_songs(song):
    for user in users:
        flip = randint(0, 1)

        if flip == 1:
            song.fav_users.append(user)
