import Adapter from "appkit/adapters/yahara";

var Track = Ember.Model.extend({
  id: Ember.attr(),
  title: Ember.attr(),
  position: Ember.attr(Number),
  duration: Ember.attr(Number),
  media_uri: Ember.attr(),

  playing: false,
  sound: null,

  play: function (){
    var track = this;
    track.loadSound().then(function() {
      track.get('sound').play();
      track.set('playing', true);
    });
  },

  pause: function(){
    this.set('playing', false);
    this.get('sound').pause();
  },

  stop: function(){
    this.set('playing', false);
    this.get('sound').stop();
  },

  loadSound: function(){
    var track = this;
    return ic.ajax(this.get('media_uri')).then(function(data){
      track.set('sound', soundManager.createSound(data));
    });
  }

});

Track.url = "/api/catalog";
Track.collectionKey = "albums";
Track.adapter = Adapter.create();

export default Track;