Yahara.AlbumsShowRoute = Ember.Route.extend({
  model: function(params) {
    return Yahara.Album.find(params.id);
  },

  actions: {
    playPause: function (track){
      if (track.get('playing')) {
        this.controllerFor('player').send('pause');
      }
      else {
        this.controllerFor('player').send('play', track);
      }
    }
  }
});