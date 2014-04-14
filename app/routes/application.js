Yahara.ApplicationRoute = Ember.Route.extend({

  model: function(){
    return Ember.RSVP.hash({
      user: Yahara.CurrentUser.create(),
      albums: Yahara.Album.fetch()
    });
  },

  setupController: function(controller, model){
    if (model.user.get('authorized')) {
      model.user.loadCollection();
    }
    controller.set('content', model.user);
    controller.set('albums', model.user);
  },

  actions: {
    playPause: function (track){
      if (this.controllerFor('application').get('authorized')){
        if (track.get('playing')) {
          this.controllerFor('player').send('pause');
        }
        else {
          this.controllerFor('player').send('play', track);
        }
      }
      else {
        this.send('openModal');
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
    },

    collect: function(album){
      var user = this.controllerFor('application').get('model');
      if (user.get('authorized')) {
        user.collect(album);
      } else {
        this.send('openModal');
      }
    },

    remove: function(album){
      var user = this.controllerFor('application').get('model');
      user.removeFromCollection(album);
    }
  }
});
