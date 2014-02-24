Yahara.ModalController = Ember.ObjectController.extend({

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