from app.models import db, Artist

def get_or_make_artist_id(name):
    artist_id = None

    try:
        artist = Artist.query.filter(Artist.name == name).one()
        artist_id = artist.id
    except:
        artist = Artist(name=name)
        db.session.add(artist)
        db.session.flush()
        artist_id = artist.id

    return artist_id


# Create song upload form along with backend route working with AWS upload for song and song artwork
