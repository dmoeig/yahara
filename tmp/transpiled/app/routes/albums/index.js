define("appkit/routes/albums/index", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        return this.modelFor('albums');
      }
    });
  });