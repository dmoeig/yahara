Yahara.ApplicationRoute = Ember.Route.extend({

  model: function(){
    return Yahara.currentUser;
  },

  actions: {
    openModal: function() {
      return this.controllerFor('modal').send('open');
    },

    closeModal: function() {
      return this.controllerFor('modal').send('close');
    },

    signOut: function() {
      return this.controller.get('model').set('token', null);
    }
  }
});