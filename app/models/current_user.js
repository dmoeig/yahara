Yahara.CurrentUser = Ember.Object.extend({
  token: null,
  cardnumber: null,
  authorized: Ember.computed.bool('token'),
  notAuthorized: Ember.computed.not('authorized'),
  error: false,
  collection: Ember.A(),

  collection_ids: function(){
    return this.get('collection').map(function(album){
      return album.mprint.origin;
    });
  }.property('collection.@each'),

  init: function() {
    this.set('token', localStorage.token);
  },

  signOut: function(){
    this.set('token', null);
    localStorage.removeItem('token');
  },

  signIn: function(token){
    this.set('token', token);
    localStorage.token = token;
    this.loadCollection();
  },

  collect: function(album){
    var user = this;
    ic.ajax.request({
      type: "POST",
      url: ENV.HOST + "/collection",
      data: { 'mprint': album.get('id'), 'token': this.get('token') }
    }).then(function(data){
      user.loadCollection(data);
    });
  },

  removeFromCollection: function(album){
    var user = this;
    var collection_album = this.get('collection').find(function(calbum){
      return calbum.mprint.origin === album.get('mprint.origin');
    });

    ic.ajax.request({
      type: "DELETE",
      url: ENV.HOST + "/collection/"+collection_album.mprint.active + "?token=" + user.get('token')
    }).then(function(data){
      user.loadCollection(data);
    });
  },

  loadCollection: function(response){
    var user = this;
    if (arguments.length === 1) {
      user.get('collection').setObjects(response);
    }
    else {
      ic.ajax.request({
        type: "GET",
        url: ENV.HOST + "/collection",
        data: user.getProperties('token')
      }).then(function(data){
        user.get('collection').addObjects(data);
      }, function(error){
        console.error('There was a problem loading the collection');
      });
    }
  }
});
