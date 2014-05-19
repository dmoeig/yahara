Yahara.PlayerController = Ember.ObjectController.extend({

  trackFinished: function(){
    var track = this.get('content');
    if (track.get('finished')){
      if (track.get('islastTrack')){
        track.set('playing', false);
        this.set('content', null);
      } else {
        this.send('play', this.get('content.nextTrack'));
      }
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
      if (typeof track !== 'undefined') {
        if (this.get('content') !== null) {
          this.get('content').stop();
        }
        var sound = soundManager.createSound({
          url: "/assets/audio/point1sec.mp3",
        });
        sound.play();

        this.set('content', track);
        this.get('content').play();
      }
    }
  }
});
