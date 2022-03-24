# Cofi
App Academy capstone project

[Visit the site live here!](https://co-fi.herokuapp.com/)

* [MVP Feature List](https://github.com/jstnswn/Cofi/wiki/Feature-List)
* [User Stories](https://github.com/jstnswn/Cofi/wiki/User-Stories)
* [Database Schema](https://github.com/jstnswn/Cofi/wiki/Database-Schema)

[![homepage.png](https://i.postimg.cc/DZFbZYMs/Screen-Shot-2022-03-24-at-1-33-42-AM.png)](https://postimg.cc/p9GdckxX)

# Technologies Used

<img src="react-app/public/images/AWS.png" width="40" height="40"><img src="react-app/public/images/Python.png" width="40" height="40"><img src="react-app/public/images/Flask.png" width="40" height="40"><img src="react-app/public/images/React.png" width="40" height="40"><img src="react-app/public/images/Redux.png" width="40" height="40"><img src="react-app/public/images/HTML.png" width="40" height="40"><img src="react-app/public/images/CSS.png" width="40" height="40"><img src="react-app/public/images/Node.png" width="40" height="40"><img src="react-app/public/images/PostgresQL.png" width="40" height="40"><img src="react-app/public/images/SQLA.png" width="40" height="40"><img src="react-app/public/images/Javascript.png" width="40" height="40"><img src="react-app/public/images/Docker.png" width="40" height="40">

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
