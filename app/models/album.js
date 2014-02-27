Yahara.Album = Ember.Model.extend({
  id: Ember.attr(),
  title: Ember.attr(),
  album_art: Ember.attr(),
  tracks: Ember.hasMany('Yahara.Track', {key: 'tracks', embedded: true}),
  main_artist: Ember.attr(),
  art: Ember.computed.alias('album_art'),

  slug: function(){
    return (this.get('title')+"-"+this.get('main_artist')).dasherize();
  }.property('title', 'main_artist')

});


Yahara.Album.url = "/api/catalog/yahara";
Yahara.Album.adapter = Yahara.Adapter.create();