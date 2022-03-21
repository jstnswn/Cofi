from app.models import db, Album
from app.seeds.songs import songs
from app.seeds.users import users
from app.seeds.album_favorites import add_favorites_to_albums

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

    # Add songs
    # albums[0].songs = albums[0].songs + songs[:5]
    # albums[1].songs = albums[1].songs + songs[5:10]
    # albums[2].songs = albums[2].songs + songs[11:15]
    # albums[3].songs = albums[3].songs + songs[16:21]
    # albums[4].songs = albums[4].songs + songs[21:27]
    # albums[5].songs = albums[5].songs + songs[27:36]
    # albums[6].songs = albums[6].songs + songs[36:43]
    # albums[7].songs = albums[7].songs + songs[43:48]
    # albums[8].songs = albums[8].songs + songs[48:54]
    # albums[9].songs = albums[9].songs + songs[54:63]
    # albums[10].songs = albums[10].songs + songs[63:69]

    # albums[0].likers.append(demo)

    for album in albums:
        # Add likes
        add_favorites_to_albums(album, users)

        db.session.add(album)

    db.session.commit()


def undo_albums():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE;')
    db.session.commit()
