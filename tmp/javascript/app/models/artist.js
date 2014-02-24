import Adapter from "appkit/adapters/yahara";

var Artist = Ember.Model.extend({
  id: Ember.attr(),
  name: Ember.attr()
});

// Artist.url = "/api/catalog";
// Artist.collectionKey = "artists";
Artist.adapter = Adapter.create();

export default Artist;