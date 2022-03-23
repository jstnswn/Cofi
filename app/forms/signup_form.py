from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')



class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired('Username is required'), username_exists, Length(min=3, max=30, message='Username must be between 3 and 30 characters.')])
    email = StringField('email', validators=[DataRequired('Email address is required'), Email('Email address is invalid'), user_exists, Length(min=3, max=255, message='Email must be between 3 and 255 characters.')])
    password = StringField('password', validators=[DataRequired('Password is required')])
