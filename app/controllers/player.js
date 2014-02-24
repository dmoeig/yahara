Yahara.PlayerController = Ember.ObjectController.extend({

  trackFinished: function(){
    if (this.get('content.finished')){
      this.send('play', this.get('content.nextTrack'));
    }
  }.observes('content.finished'),

  actions: {
    pause: function(){
      this.get('content').pause();
    },

    toggle: function(){
      if (this.get('playing')) {
        this.get('content').pause();
      }
      else {
        this.get('content').resume();
      }
    },

    play: function(track){
      if (this.get('content') !== null) {
        this.get('content').stop();
      }
      this.set('content', track);
      this.get('content').play();
    }
  }
});