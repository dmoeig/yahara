Yahara.Album = Ember.Model.extend({
  id: Ember.attr(),
  title: Ember.attr(),
  album_art: Ember.attr(),
  tracks: Ember.hasMany('Yahara.Track', {key: 'tracks', embedded: true}),
  main_artist: Ember.attr(),
  mprint: Ember.attr(),
  rights: Ember.attr(),

  art: Ember.computed.alias('album_art'),

  slug: function(){
    return (this.get('title')+"-"+this.get('main_artist')).parameterize();
  }.property('title', 'main_artist'),

  artistSlug: function(){
    return (this.get('main_artist')).parameterize();
  }.property('main_artist')

});


Yahara.Album.url = "/catalog/yahara";
Yahara.Album.adapter = Yahara.Adapter.create();