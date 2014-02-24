Yahara.Album = Ember.Model.extend({
  id: Ember.attr(),
  title: Ember.attr(),
  album_art: Ember.attr(),
  tracks: Ember.hasMany('Yahara.Track', {key: 'tracks', embedded: true}),
  main_artist: Ember.attr(),
  artists: Ember.hasMany('Yahara.Artist', {key: 'artists', embedded: true}),

  art: Ember.computed.alias('album_art')
});


Yahara.Album.url = "/api/catalog/yahara";
Yahara.Album.adapter = Yahara.Adapter.create();