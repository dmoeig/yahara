define("appkit/models/track", 
  ["appkit/adapters/yahara","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Adapter = __dependency1__["default"];

    var Track = Ember.Model.extend({
      id: Ember.attr(),
      title: Ember.attr(),
      position: Ember.attr(Number),
      duration: Ember.attr(Number),
      media_uri: Ember.attr(),

      playing: false,
      sound: null,
      currentPosition: 0,

      pct: function(){
        debugger
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
        return ic.ajax(this.get('media_uri')).then(function(data){
          track.set('sound', soundManager.createSound({
            url: data.url,
            whileplaying: function(){ track.updatePosition();}
          }));
        });
      },

      updatePosition: function(){
        this.set('currentPosition', this.get('sound').position)
      }

    });

    Track.url = "/api/catalog";
    Track.collectionKey = "albums";
    Track.adapter = Adapter.create();

    __exports__["default"] = Track;
  });