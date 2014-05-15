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
    controller.set('albums', model.albums);
  },

  actions: {
    playPause: function (track){
      var player = this.controllerFor('player');
      var user = this.controller.get('model');

      if (user.get('authorized')){
        if (track.get('playing')) {
          player.send('pause');
        }
        else {
          player.send('play', track);
        }
      }
      else {
        this.send('openModal');
      }
    },

    download: function(format){
      var user = this.controller.get('model');

      if (user.get('authorized')){
        this.modelFor('albums.show').download(format);
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

    goHome: function(){
      this.controllerFor('search').set('searchString', "")
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
