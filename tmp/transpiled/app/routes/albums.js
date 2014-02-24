define("appkit/routes/albums", 
  ["appkit/models/album","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Album = __dependency1__["default"];

    __exports__["default"] = Ember.Route.extend({
      model: function() {
        return Album.fetch();
      }
    });
  });