var yaml = require('js-yaml');
var fs   = require('fs');
var hat  = require('hat');
var moment = require('moment');

var data = yaml.safeLoad(fs.readFileSync('api-stub/data.yml', 'utf8'));

var duration = function(){
  return 120 + Math.floor(Math.random() * (240 - 120 + 1));
};

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

  album.created = moment().unix();
  album.album_art = "http://localhost:8000/assets/images/art/"+ next_album_id + ".jpg"
  album.tracks = album.tracks.map(function(track_title){
    var track = {};
    track.title = track_title;
    track.length = duration();
    track.position = next_track_position;
    track.media_uri = "http://localhost:8000/api/album/1/track/"+track.position
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

    server.post('/members', function(req, res) {
      res.json({ "token": "aTokenForTesting" });
    });

    server.get('/album/:id/track/:position', function(req, res) {
      res.json({ url: "http://localhost:8000/assets/audio/song.mp3" });
    });
  });

};