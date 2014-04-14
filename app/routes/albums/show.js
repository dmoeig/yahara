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
      var route = this;
      var album = this.modelFor(this.routeName);
      ic.ajax.request({
        type: "DELETE",
        url: ENV.HOST + "/collection/"+album.get('id')+ "?token=" + user.get('token')
      }).then(function(data){
        user.loadCollection(data);
      });
    }
  }
});
