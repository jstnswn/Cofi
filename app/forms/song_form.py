from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, ValidationError, BooleanField, FileField
from app.models import Song, Artist


def artist_exists(form, field):
    # Checking if user exists
    email = field.data
    user = Artist.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

class SongForm(FlaskForm):
    title = StringField('title', validators=[
        DataRequired('Song title is required'),
        Length(max=50, message='Tile must be less than 50 characters')])
    artist = StringField('artist', validators=[
        DataRequired('Artist is required'),
        Length(max=50, message='Artist name must be less than 50 characters')])
    song = FileField('song', validators=[DataRequired()])
    image = FileField('image')
    private = BooleanField('private', validators=[DataRequired()])
