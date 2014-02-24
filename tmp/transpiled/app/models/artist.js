define("appkit/models/artist", 
  ["appkit/adapters/yahara","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Adapter = __dependency1__["default"];

    var Artist = Ember.Model.extend({
      id: Ember.attr(),
      name: Ember.attr()
    });

    // Artist.url = "/api/catalog";
    // Artist.collectionKey = "artists";
    Artist.adapter = Adapter.create();

    __exports__["default"] = Artist;
  });