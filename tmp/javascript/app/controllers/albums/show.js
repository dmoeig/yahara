export default Ember.ObjectController.extend({
  needs: ['player'],
  player: Ember.computed.alias("controllers.player"),

  actions: {
    playPause: function (album, track){
      if (track.get('playing')) {
        this.get('player').send('pause');
      }
      else {
        this.get('player').send('play', album, track);
      }
    }
  }
});