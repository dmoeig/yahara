define("appkit/routes/profile", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      beforeModel: function(transition) {
        if (this.controllerFor('application').get('currentUser')) {

        }
        else {
          transition.abort();
          this.controllerFor('modal').send('open');
          this.controllerFor('modal').set('previousTransition', transition);
        }
      },

      model: function() {
        return {};
      }
    });
  });