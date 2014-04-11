Yahara.CollectionRoute = Ember.Route.extend({
  beforeModel: function() {
    if (this.modelFor('application').get('notAuthorized')){
      this.transitionTo('application');
    }
  },

  setupController: function(controller, model){
    var albums = this.modelFor('albums');
    var collection_ids = this.modelFor('application').get('collection');
    var collection = albums.filter(function(album){
      return collection_ids.contains(album.get('mprint.origin'));
    });
    controller.set('content', collection);
  }

});
