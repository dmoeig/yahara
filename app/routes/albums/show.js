Yahara.AlbumsShowRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('albums').findBy('slug', params.slug);
  },

  actions: {
    playPause: function (track){
      if (track.get('playing')) {
        this.controllerFor('player').send('pause');
      }
      else {
        this.controllerFor('player').send('play', track);
      }
    },

    collect: function(){
      console.log('Will collect an album');
    }
  }
});