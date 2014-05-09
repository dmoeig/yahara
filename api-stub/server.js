var yaml = require('js-yaml');
var fs   = require('fs');
var hat  = require('hat');
var moment = require('moment');
var _ = require('underscore');
var _s = require('underscore.string');

var data = yaml.safeLoad(fs.readFileSync('api-stub/data.yml', 'utf8'));

var duration = function(){
  return (120 + Math.floor(Math.random() * (240 - 120 + 1)))*1000;
};

var collection = []

var new_uuid = hat.rack();
var next_album_id = 0;

data.map(function(album){
  var next_track_position = 1;
  var uuid = new_uuid();
  next_album_id++;

  album.asset_type = "album"
  album.mprint = {
    active: uuid,
    origin: uuid,
    predecessor: uuid
  }

  album.review = 'OMG This is the best fake review of the best album evar! You can even put <a href="#">HTML</a> in here.</p> <p>- Steve Faukner at <a href="https://www.murfie.com/" class="content-creator">Murfie.com</a>'
  album.created = moment().unix();
  album.album_art = "http://localhost:8000/assets/images/art/"+ next_album_id + ".jpg"
  album.artist_url = "http://localhost:8000/artist/" + _s.slugify(album.artist_name)
  album.slug = _s.slugify(album.title + " " + album.artist_name)
  album.tracks = album.tracks.map(function(track_title){
    var track = {};
    track.title = track_title;
    track.length = duration();
    track.position = next_track_position;
    track.filename = track.position + ".mp3"
    next_track_position++;
    return track;
  });
});

module.exports = function(server) {

  // Create an API namespace, so that the root does not
  // have to be repeated for each end point.
  server.namespace('/api', function() {

    server.get('/catalog/yahara', function(req, res) {
      res.json(data);
    });

    server.get('/stream/:mprint/:filename', function(req, res) {
      res.json({ url: "http://localhost:8000/assets/audio/song.mp3" });
    });

    server.post('/collection', function(req, res) {
      if (req.body.token === null){
        res.status(401).json({"code":"InvalidCredentials"});
      }
      response = collection.concat(_.find(data, function(album){
        return album.mprint.active === req.body.mprint
      }));
      res.json(response);
    });

    server.get('/download/:mprint/:filename', function(req, res) {
      res.json({ url: "http://localhost:8000/assets/audio/song.mp3.zip" });
    });

    server.get('/collection', function(req, res) {
      if (req.body.token === null){
        res.status(401).json({"code":"InvalidCredentials"});
      }
      res.json(collection);
    });

    server.delete('/collection/:mprint', function(req, res) {
      if (req.body.token === null){
        res.status(401).json({"code":"InvalidCredentials"});
      }
      res.json(collection);
    });



    server.post('/userforcard', function(req,res){
      if (req.body.cardnumber === "fail"){
        res.status(401).json({"code":"InvalidCredentials","message":"unable to validate the supplied card number"});
      }
      else {
        res.json({
          "created": moment().unix(),
          "private_info":  {
            "token": "aTokenForTesting"
          }
        });
      }
    });
  });

};
