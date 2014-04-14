Yahara.Album = Ember.Model.extend({
  id: Ember.attr(),
  title: Ember.attr(),
  record_label: Ember.attr(),
  release_date: Ember.attr(),
  album_art: Ember.attr(),
  tracks: Ember.hasMany('Yahara.Track', {key: 'tracks', embedded: true}),
  artist_name: Ember.attr(),
  mprint: Ember.attr(),

  firstTrack: function(){
    return this.get('tracks.firstObject');
  }.property('tracks.@each'),

  art: Ember.computed.alias('album_art'),

  slug: function(){
    return (this.get('title')+"-"+this.get('artist_name')).parameterize();
  }.property('title', 'artist_name'),

  artistSlug: function(){
    return (this.get('artist_name')).parameterize();
  }.property('artist_name')

});


Yahara.Album.url = "/catalog/yahara";
Yahara.Album.adapter = Yahara.Adapter.create();
