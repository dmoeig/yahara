Yahara.CollectionRoute = Ember.Route.extend({
  beforeModel: function() {
    if (this.controllerFor('application').get('notAuthorized')){
      this.transitionTo('application');
    }
  },

  setupController: function(controller){
    var albums = this.modelFor('application').albums;
    var collection_ids = this.controllerFor('application').get('collection_ids');
    var collection = albums.filter(function(album){
      return collection_ids.contains(album.get('mprint.origin'));
    });
    controller.set('content', collection);
  }

});
