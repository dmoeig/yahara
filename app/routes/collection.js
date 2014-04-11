Yahara.CollectionRoute = Ember.Route.extend({

  setupController: function(controller, model){
    var albums = this.modelFor('albums');
    var collection_ids = this.modelFor('application').get('collection');
    var collection = albums.filter(function(album){
      return collection_ids.contains(album.get('id'));
    });
    controller.set('content', collection);
  }

});
