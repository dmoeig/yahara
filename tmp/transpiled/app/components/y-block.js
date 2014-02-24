define("appkit/components/y-block", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Component.extend({
      classNames: ['y-block'],

      expanded: false,
      title: null,

      actions: {
        toggle: function(){
          this.toggleProperty('expanded');
        }
      }
    });
  });