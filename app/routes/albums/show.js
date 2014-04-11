Yahara.AlbumsShowRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('albums').findBy('slug', params.slug);
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

    collect: function(){
      user = Yahara.currentUser
      route = this
      if (user.get('authorized')) {
        var album = this.modelFor(this.routeName);
        ic.ajax.request({
          type: "POST",
          url: ENV.HOST + "/collection",
          data: { 'mprint': album.get('id') }
        }).then(function(data){
          route.controllerFor('application').get('model.collection').addObjects(data.map(function(album){
            return album.mprint.active;
          }));
        });
      } else {
        this.send('openModal');
      }
    }
  }
});
