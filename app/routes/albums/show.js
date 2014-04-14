Yahara.AlbumsShowRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('application').albums.findBy('slug', params.slug);
  },

  actions: {
    collect: function(){
      var user = this.controllerFor('application').get('model');
      var route = this;
      if (user.get('authorized')) {
        var album = this.modelFor(this.routeName);
        ic.ajax.request({
          type: "POST",
          url: ENV.HOST + "/collection",
          data: { 'mprint': album.get('id'), 'token': user.get('token') }
        }).then(function(data){
          user.loadCollection(data);
        });
      } else {
        this.send('openModal');
      }
    },

    remove: function(){
      var user = this.controllerFor('application').get('model');
      var album = this.modelFor(this.routeName);
      var collection = user.get('collection');
      var collection_album = collection.find(function(calbum){
        return calbum.mprint.origin === album.get('mprint.origin');
      });

      ic.ajax.request({
        type: "DELETE",
        url: ENV.HOST + "/collection/"+collection_album.mprint.active + "?token=" + user.get('token')
      }).then(function(data){
        user.loadCollection(data);
      });
    }
  }
});
