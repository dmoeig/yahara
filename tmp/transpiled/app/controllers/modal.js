define("appkit/controllers/modal", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.ObjectController.extend({

      previousTransition: null,

      actions: {
        open: function() {
          $('#modal').show();
        },

        close: function() {
          $('#modal').hide();
        },
        submit: function() {
        }
      }
    });
  });