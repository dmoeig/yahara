import ajax from "appkit/utils/ajax";

export default Ember.ObjectController.extend({
  currentSound: null,

  actions: {
    play: function (track){
      var that = this;
      var sound;

      ajax(track.media_uri).then(function(data){
        Ember.set(track, 'playing', true);
        sound = soundManager.createSound(data);
        that.set('currentSound', sound);
        sound.play();
      });
    },
    pause: function (track){
      var sound;

      sound = this.get('currentSound');
      sound.stop();
      Ember.set(track, 'playing', false);
    }
  }
});