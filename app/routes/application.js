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
    playPause: function (track){
      if (track.get('playing')) {
        this.controllerFor('player').send('pause');
      }
      else {
        this.controllerFor('player').send('play', track);
      }
    },
    
    openModal: function() {
      return this.controllerFor('modal').send('open');
    },

    closeModal: function() {
      return this.controllerFor('modal').send('close');
    },

    signOut: function() {
      this.controller.get('model').signOut();
      this.transitionTo('application.index');
    }
  }
});
