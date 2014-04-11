Yahara.ApplicationRoute = Ember.Route.extend({

  model: function(){
    return Yahara.CurrentUser.create();
  },

  setupController: function(controller, model){
    if (model.get('authorized')) {
      model.loadCollection();
    }
    this._super(controller, model);
  },

  actions: {
    openModal: function() {
      return this.controllerFor('modal').send('open');
    },

    closeModal: function() {
      return this.controllerFor('modal').send('close');
    },

    signOut: function() {
      return this.controller.get('model').signOut();
    }
  }
});
