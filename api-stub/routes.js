artists = [
	{ 
		"id": 1,  "name": "PHOX" 
	}
]

tracks = [
	{
		"id":456,
		"position":1,
		"title":"Blackened",
		"duration":320,
		"media_uri":"http://localhost:8000/api/album/1/track/1"
	},
	{
		"id":457,
		"position":2,
		"title":"...and Justice for All",
		"duration":385,
		"media_uri":"http://localhost:8000/api/album/1/track/2"
	}
]

albums = [
	{ 
		"id": 1, 
		"title": "Unblushing", 
		"art": "http://localhost:8000/assets/images/1.jpg",
		"main_artist": artists[0],
		"artists": artists,
		"tracks": tracks
	}
]

module.exports = function(server) {

  // Create an API namespace, so that the root does not 
  // have to be repeated for each end point.
	server.namespace('/api', function() {

		server.get('/catalog', function(req, res) {
			res.json({ "albums": albums });
		});

		server.post('/members', function(req, res) {
			res.json({ "token": "aTokenForTesting" });
		});

		server.get('/album/:id/track/:position', function(req, res) {
			res.json({ url: "http://localhost:8000/assets/audio/song.mp3" });
		});
	});

};