from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, FileField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Song, Artist


class AlbumForm(FlaskForm):
    title = StringField('title', validators=[
        DataRequired('Album title is required')])
    artist = StringField('artist', validators=[
        DataRequired('Artist is required'),
        Length(max=50, message='Artist name must be less than 50 characters')])
    private = BooleanField('private')
    image_url = StringField('image_url')
