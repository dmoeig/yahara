define("appkit/models/album", 
  ["appkit/adapters/yahara","appkit/models/track","appkit/models/artist","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Adapter = __dependency1__["default"];
    var Track = __dependency2__["default"];
    var Artist = __dependency3__["default"];

    var Album = Ember.Model.extend({
      id: Ember.attr(),
      title: Ember.attr(),
      art: Ember.attr(),
      tracks: Ember.hasMany(Track, {key: 'tracks', embedded: true}),
      main_artist: Ember.belongsTo(Artist, {key: 'main_artist', embedded: true}),
      artists: Ember.hasMany(Artist, {key: 'artists', embedded: true})
    });

    Album.url = "/api/catalog";
    Album.collectionKey = "albums";
    Album.adapter = Adapter.create();

    __exports__["default"] = Album;
  });