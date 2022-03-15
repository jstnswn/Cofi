from app.models import db, Album

albums = [
    Album( #1
        title='After Hours',
        artist_id=1,
        user_id=1,
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/afterhours-art.png'
    ),
    Album( #2
        title='Azure Blue',
        artist_id=2,
        user_id=1,
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/azure-art.png'
    ),
    Album( #3
        title='Discovery',
        artist_id=1,
        user_id=1,
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/discovery_art.png'
    ),
    Album( #4
        title='Escapades',
        artist_id=3,
        user_id=1,
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/escapade.png'
    ),
    Album( #5
        title='In My Head',
        artist_id=1,
        user_id=1,
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/in-my-head-art.png'
    ),
    Album( #6
        title='Moonglow',
        artist_id=4,
        user_id=1,
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/moonglow-art.png'
    ),
    Album( #7
        title='Polar',
        artist_id=5,
        user_id=1,
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/polar_art.png'
    ),
    Album( #8
        title='Riverside',
        artist_id=6,
        user_id=1,
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/riverside-art.png'
    ),
    Album( #9
        title='Satellite Nights',
        artist_id=7,
        user_id=1,
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/sattelite_nights_art.png'
    ),
    Album( #10
        title='Staring Through',
        artist_id=8,
        user_id=1,
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/staring_through.png'
    ),
    Album( #11
        title='Sweet Dreams',
        artist_id=9,
        user_id=1,
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/sweet_dreams_art.png'
    ),
]


def seed_albums():
    for album in albums:
        db.session.add(album)

    db.session.commit()


def undo_albums():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE;')
    db.session.commit()
