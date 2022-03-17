from random import randint
from app.models import db, User, Album




def add_likers_to_albums(album, users):
    for user in users:
        flip = randint(0, 1)

        if flip is 1:
            album.likers.append(user)
