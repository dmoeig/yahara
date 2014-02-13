_ = require('underscore')

artists = [
	{ "id": 1,  "name": "PHOX" },
	{ "id": 2,  "name": "Beefus" },
	{ "id": 3,  "name": "Ben Sidran" },
	{ "id": 4,  "name": "Venus in Furs" },
	{ "id": 5,  "name": "PHOX" },
	{ "id": 6,  "name": "F.Stokes" }
]

album_titles = [
	"A Momentary Lapse of Reason",
	"Thriller",
	"Back in Black",
	"... And Justice for All",
	"More Songs About Buildings and Food",
	"Paranoid",
	"Blood Sugar Sex Magick"
]

tracks = [
	{
		"id":1,
		"position":1,
		"title":"Track 1",
		"duration":320,
		"media_uri":"http://localhost:8000/api/album/1/track/1"
	},
	{
		"id":2,
		"position":2,
		"title":"Track 2",
		"duration":385,
		"media_uri":"http://localhost:8000/api/album/1/track/2"
	},
	{
		"id":3,
		"position":3,
		"title":"Track 3",
		"duration":320,
		"media_uri":"http://localhost:8000/api/album/1/track/3"
	},
	{
		"id":4,
		"position":4,
		"title":"Track 4",
		"duration":385,
		"media_uri":"http://localhost:8000/api/album/1/track/4"
	},
	{
		"id":5,
		"position":5,
		"title":"Track 5",
		"duration":320,
		"media_uri":"http://localhost:8000/api/album/1/track/5"
	},
	{
		"id":6,
		"position":6,
		"title":"Track 6",
		"duration":385,
		"media_uri":"http://localhost:8000/api/album/1/track/6"
	}
]

catalog = function() {
	var json = { "albums": [] };
	_.range(1,24).forEach( function(id){
		var	album = {};
		album.title =  _.sample(album_titles);
		album.main_artist = _.sample(artists);
		album.artists = _.sample(artists,2);
		album.id = id;
		album.tracks = tracks;
		album.art = "http://localhost:8000/assets/images/"+_.sample([1,2,3,4,5])+".jpg"
		json.albums.push(album);
	});
	return json
}

module.exports = function(server) {

  // Create an API namespace, so that the root does not 
  // have to be repeated for each end point.
	server.namespace('/api', function() {

		server.get('/catalog', function(req, res) {
			res.json(catalog());
		});

		server.post('/members', function(req, res) {
			res.json({ "token": "aTokenForTesting" });
		});

		server.get('/album/:id/track/:position', function(req, res) {
			res.json({ url: "http://localhost:8000/assets/audio/song.mp3" });
		});
	});

};