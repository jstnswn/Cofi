# Cofi

App Academy capstone project.
Co-fi is a music application inspried by SoundCloud and Spotify with a minimalist approach and lofi-genre theme. Co-fi v1.0.0 is a web music player that allows users to upload, edit, and listen to their own or other user's music. Future editions aim to allow users to create music "sessions" where all participant's music players will be synced to the same playlist.

[Visit the site live here!](https://co-fi.herokuapp.com/)

* [MVP Feature List](https://github.com/jstnswn/Cofi/wiki/Feature-List)
* [User Stories](https://github.com/jstnswn/Cofi/wiki/User-Stories)
* [Database Schema](https://github.com/jstnswn/Cofi/wiki/Database-Schema)

[![homepage.png](https://i.postimg.cc/DZFbZYMs/Screen-Shot-2022-03-24-at-1-33-42-AM.png)](https://postimg.cc/p9GdckxX)

# Technologies Used

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" height=40 />
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" height=40 />


- Amazon web services
- Python
- Flask
- React
- Redux
- HTML
- CSS
- Node
- Postgres
- Sequel Alchemy
- JavaScript
- Docker
# Getting Started

1. Clone the repository

       git@github.com:jstnswn/Cofi.git

2. CD into the /app directory and install dependencies

        pipenv install

3. CD into the /react-app directory and install dependencies

        npm install

4. Create a .env file based on the example with proper settings for your development environment

5. Setup your PostgreSQL user, password and database and verify that it matches your .env file

6. Start your shell, migrate your database, seed your database, and run the flask app

        pipenv shell


        flask db upgrade


        flask seed all


        flask run

7. Create your AWS user and bucket:

      -Create a bucket:

        (https://s3.console.aws.amazon.com/s3/home?region=us-east-1)

      -Create a user with `programmatic access` by navigating to:

        (https://console.aws.amazon.com/iam/home?#/users)

      -Set up a security policy for your user: 'Attach existing policies directly' => 'Create Policy'

      -Click the `JSON tab` and set a policy:

          {
           "Version": "2012-10-17",
           "Statement": [
             {
               "Sid": "Stmt1420751757000",
               "Effect": "Allow",
               "Action": ["s3:*"],
               "Resource": "arn:aws:s3:::<NAME OF BUCKET>/*"
             }
           ]
          }

      -Now update your .env with your `S3_BUCKET`, `S3_KEY`, `S3_SECRET`

8. Open another terminal and change directory into /react-app and run the React app

          npm start
          
# Home Page
[![home-features.png](https://i.postimg.cc/CK9PP24W/Screen-Shot-2022-03-24-at-2-49-39-AM.png)](https://postimg.cc/wtcQ30ZV)

On the home page users can toggle between albums and songs to see their respective featured and new content. "Featured" is randomly chosesn content from the 10 most recent uploads. On this page, users can play music from the caterogires provided, like songs/albums, and add songs from the album player into a previously created playlist.

# Library

From the library, users can view, edit, and remove content that they have uploaded. Users can toggle between their songs, albums, and playlists by using the right sidebar selector.

# Library Page Songs

[![library.png](https://i.postimg.cc/cHQmDLCn/Screen-Shot-2022-03-24-at-2-48-44-AM.png)](https://postimg.cc/XGYdq3wj)

This section displays the user's uploaded songs. Here they can remove the song, or make edits to the song by hovering over the song item and clicking the ellipsis on the far right. Users can edit the song's title, artist, album, audio file, and artwork. A song's default artwork display is the artwork of the album it belongs to, therefor changed song artwork will only appear if the song becomes single / no longer belongs to an album.

# Library Page Albums

[![library.png](https://i.postimg.cc/HkxyJkCt/Screen-Shot-2022-03-24-at-1-34-23-AM.png)](https://postimg.cc/N53MSYFy)

This section displays the user's uploaded albums. Clicking on an album will display the album's song contents. After an album is clicked on, the header will change to display the album's artwork. The user can make changes to the album by clicking the ellipsis by the album's title in the header.
