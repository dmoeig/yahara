define("appkit/routes/application", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      actions: {
          openModal: function() {
            return this.render('modal', {
              into: 'application',
              outlet: 'modal'
            });
          },
          
          closeModal: function() {
            return this.disconnectOutlet({
              outlet: 'modal',
              parentView: 'application'
            });
          }
        }
    });
  });