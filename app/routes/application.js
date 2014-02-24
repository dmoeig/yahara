Yahara.ApplicationRoute = Ember.Route.extend({
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