export default Ember.ObjectController.extend({
  actions: {
    open: function() {
      $('#modal').show();
    },

    close: function() {
      $('#modal').hide();
    }
  }
});