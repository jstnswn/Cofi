from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, FileField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Song, Artist


def artist_exists(form, field):
    # Checking if user exists
    email = field.data
    user = Artist.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

class SongForm(FlaskForm):
    title = StringField('title', validators=[
        DataRequired('Song title is required')])
    artist = StringField('artist')
    album_id = IntegerField('album_id')
    # artist = StringField('artist', validators=[
    #     DataRequired('Artist is required'),
    #     Length(max=50, message='Artist name must be less than 50 characters')])

    #TODO song validation
    # song = FileField('song', validators=[DataRequired()])
    song = FileField('song')
    image_url = StringField('image_url')
    private = BooleanField('private', validators=[DataRequired()])
