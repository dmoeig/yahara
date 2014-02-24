import Adapter from "appkit/adapters/yahara";
import Track from  "appkit/models/track";
import Artist from "appkit/models/artist";

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

export default Album;