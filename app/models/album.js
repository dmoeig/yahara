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
  purchase_links: Ember.attr(),

  art: Ember.computed.alias('album_art'),

  firstTrack: function(){
    return this.get('tracks.firstObject');
  }.property('tracks.@each'),

  artistSlug: function(){
    return this.get('artist_url').match(/artist\/([a-z0-9\-]+)/)[1];
  }.property('artist_name'),

  download: function(format){
    ga('send','event','Download', 'click', format, 1);
    var uri = ENV.HOST + "/download/" + this.get('id') + "/" + encodeURIComponent(this.get('slug')) + "-" + format +".zip?token=" + localStorage.token;
    ic.ajax.request(uri).then(function(resp){
      window.location = resp.url;
    });
  },

  altText: function() {
    return "Album art for " + this.get('title') + " by " + this.get('artist_name');
  }.property('title', 'artist_name'),

  noPurchaseLinks: Ember.computed.empty('purchase_links')

});


Yahara.Album.url = "/catalog/yahara";
Yahara.Album.adapter = Yahara.Adapter.create();
