Yahara.CurrentUser = Ember.Object.extend({
  token: null,
  cardnumber: null,
  authorized: Ember.computed.bool('token'),
  notAuthorized: Ember.computed.not('authorized'),
  error: false,
  collection: Ember.A(),

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

  loadCollection: function(response){
    var user = this;
    if (arguments.length == 1) {
      user.get('collection').addObjects(response.map(function(album){
        return album.mprint.origin;
      }));
    }
    else {
      ic.ajax.request({
        type: "GET",
        url: ENV.HOST + "/collection",
        data: user.getProperties('token')
      }).then(function(data){
        user.get('collection').addObjects(data.map(function(album){
          return album.mprint.origin;
        }));
      }, function(error){
        console.error('There was a problem loading the collection');
      });
    }
  }
});
