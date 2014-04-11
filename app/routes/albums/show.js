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
    }
  }
});
