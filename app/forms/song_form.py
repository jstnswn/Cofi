from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, FileField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Song, Artist



class SongForm(FlaskForm):
    title = StringField('title', validators=[
        DataRequired('Artist is required'),
        Length(max=50, message='Artist name must be less than 50 characters')])
    artist = StringField('artist', validators=[
        DataRequired('Artist is required'),
        Length(max=50, message='Artist name must be less than 50 characters')])
    album_id = IntegerField('album_id')
    # artist = StringField('artist', validators=[
    #     DataRequired('Artist is required'),
    #     Length(max=50, message='Artist name must be less than 50 characters')])

    #TODO song validation
    # song = FileField('song', validators=[DataRequired()])
    song = FileField('song')
    image_url = StringField('image_url')
    private = BooleanField('private', validators=[DataRequired()])
