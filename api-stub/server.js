var yaml = require('js-yaml');
var fs   = require('fs');

var data = yaml.safeLoad(fs.readFileSync('api-stub/data.yml', 'utf8'));

var next_album_id = 1;
var next_track_id = 1;
var next_genre_id = 1;
var next_artist_id = 1;
var genre_identity_map = {};
var artist_identity_map = {};

var duration = function(){
  return 120 + Math.floor(Math.random() * (240 - 120 + 1));
};

var find_or_create_genre = function(name){
  if (genre_identity_map[name]) {
    return genre_identity_map[name];
  }
  else {
    var genre = {};
    genre.name = name;
    genre.id = next_genre_id;
    next_genre_id++;
    genre_identity_map[name] = genre;
    return genre;
  }

};

var find_or_create_artist = function(name){
  if (artist_identity_map[name]) {
    return artist_identity_map[name];
  }
  else {
    var artist = {};
    artist.name = name;
    artist.id = next_artist_id;
    next_artist_id++;
    artist_identity_map[name] = artist;
    return artist;
  }

};

data.map(function(album){
  var next_track_position = 1;
  album.id = next_album_id;
  next_album_id++;

  album.main_artist = find_or_create_artist(album.main_artist);

  album.genres = album.genres.map(function(genre_name){
    return find_or_create_genre(genre_name);
  });

  album.album_art = "http://localhost:8000/assets/images/art/"+album.id+".jpg"

  album.tracks = album.tracks.map(function(track_title){
    var track = {};
    track.id = next_track_id;
    track.title = track_title;
    track.duration = duration();
    track.position = next_track_position;
    track.media_uri = "http://localhost:8000/api/album/"+album.id+"/track/"+track.position
    next_track_position++;
    next_track_id++;
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