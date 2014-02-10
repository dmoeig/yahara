export default Ember.ObjectController.extend({

  album: null,
  track: null,

  actions: {
    pause: function(){
      this.get('track').pause();
    },

    play: function(album, track){
      if (this.get('track') {
        this.get('track').stop();
      }
      this.set('album', album);
      this.set('track', track);
      track.play();
    }
  }
});