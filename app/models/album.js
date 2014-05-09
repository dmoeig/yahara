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
    return this.get('artist_url').match(/artist\/([a-z\-]+)/)[1];
  }.property('artist_name'),

  download: function(format){
    var uri = ENV.HOST + "/download/" + this.get('id') + "/" + encodeURIComponent(this.get('slug')) + "-" + format +".zip?token=" + localStorage.token;
    ic.ajax.request(uri).then(function(resp){
      window.location = resp.url;
    });
  }

});


Yahara.Album.url = "/catalog/yahara";
Yahara.Album.adapter = Yahara.Adapter.create();
