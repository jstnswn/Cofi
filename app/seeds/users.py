from app.models import db, User
# from app.seeds.albums import albums
# from app.seeds.album_likes import add_rand_album_likes



users = [
    User(
        username='Demo', email='demo@aa.io', password='password'),
    User(
        username='marnie', email='marnie@aa.io', password='password'),
    User(
        username='bobbie', email='bobbie@aa.io', password='password'),
]

def seed_users():

    # add_rand_album_likes(demo, albums)
    # add_rand_album_likes(marnie, albums)
    # add_rand_album_likes(bobbie, albums)
    # demo.liked_albums.append(albums[1])

    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    for user in users:
        db.session.add(user)

    db.session.commit()

    # Add Likes









def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
