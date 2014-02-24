Yahara.Track = Ember.Model.extend({
  id: Ember.attr(),
  title: Ember.attr(),
  position: Ember.attr(Number),
  duration: Ember.attr(Number),
  media_uri: Ember.attr(),
  album: Ember.belongsTo('Yahara.Album', {key: 'album_id'}),

  playing: false,
  sound: null,
  currentPosition: 0,

  pctStyle: function(){
    return "width: " + (this.get('currentPosition')/1000)/this.get('duration')*100 + "%";
  }.property('currentPosition'),

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

  resume: function(){
    this.set('playing', true);
    this.get('sound').play();
  },

  loadSound: function(){
    var track = this;
    return $.ajax(this.get('media_uri')).then(function(data){
      track.set('sound', soundManager.createSound({
        url: data.url,
        whileplaying: function(){
          track.updatePosition();
        }
      }));
    });
  },

  updatePosition: function(){
    this.set('currentPosition', this.get('sound').position);
  }

});

Yahara.Track.url = "/api/catalog";
Yahara.Track.collectionKey = "albums";
Yahara.Track.adapter = Yahara.Adapter.create();