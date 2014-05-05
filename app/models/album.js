Yahara.Album = Ember.Model.extend({
  id: Ember.attr(),
  title: Ember.attr(),
  record_label: Ember.attr(),
  release_date: Ember.attr(),
  album_art: Ember.attr(),
  tracks: Ember.hasMany('Yahara.Track', {key: 'tracks', embedded: true}),
  artist_name: Ember.attr(),
  mprint: Ember.attr(),
  review: Ember.attr(),
  artist_url: Ember.attr(),
  slug: Ember.attr(),

  art: Ember.computed.alias('album_art'),

  firstTrack: function(){
    return this.get('tracks.firstObject');
  }.property('tracks.@each'),

  artistSlug: function(){
    return this.get('artist_url').match(/artists\/([a-z\-]+)/)[1]
  }.property('artist_name')

});


Yahara.Album.url = "/catalog/yahara";
Yahara.Album.adapter = Yahara.Adapter.create();
