## The Yahara Project

Making local music super awesome since 2014 :)


### Setup
1. Make sure node is installed 
    (`brew install node` on OSX, 
    on Ubuntu: 
      'sudo apt-get install python-software-properties python g++ make'
      'sudo add-apt-repository -y ppa:chris-lea/node.js'
      'sudo apt-get update')
2. Install grunt command line utility `npm install -g gulp` or 'sudo npm install -g gulp'
3. Install bower command line utility `npm install -g bower`
3. Clone this repo using `git clone`
4. cd into directory
5. run `npm install`
6. run `bower install`

## Development
1. run `gulp`
2. visit http://localhost:8000 in a browser

## Testing
1. run `gulp beforetest` this will start the server
2. run `npm test`

## Deployment
1. run `gulp dist`
2. commit changes
3. push to github and push to heroku

Built using:
- Ember
- Node.js
- Gulp
- Express
- Bower
