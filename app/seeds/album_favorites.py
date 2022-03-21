from random import randint
from app.models import db, User, Album
from app.seeds.users import users

def add_favorites_to_albums(album):
    for user in users:
        flip = randint(0, 1)

        if flip == 1:
            album.fav_users.append(user)
