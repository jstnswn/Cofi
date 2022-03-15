from app.models import db, Artist

artists = [
    Artist( #1
        name='Blue Wednesday',
    ),
    Artist( #2
        name='Miramare',
    ),
    Artist( #3
        name='Elijah Lee',
    ),
    Artist( #4
        name='S N U G',
    ),
    Artist(#5
        name='Ambulo'
    ),
    Artist(#6
        name='Slo Loris'
    ),
    Artist(#7
        name='drkmnd'
    ),
    Artist(#8
        name='kudo'
    ),
    Artist(#9
        name='Purple Cat'
    ),
]

def seed_artists():
    for artist in artists:
        db.session.add(artist)

    db.session.commit()

def undo_artists():
    db.session.execute('TRUNCATE artists RESTART IDENTITY CASCADE;')
    db.session.commit()
