from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, FileField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Song, Playlist

class PlaylistForm(FlaskForm):
    title = StringField('title', validators=[
        DataRequired('Title is required'),
        Length(max=50, message='Title must be less than 50 characters')])
    private = BooleanField('private')
    image_url = StringField('image_url')
