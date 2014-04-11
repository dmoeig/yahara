Yahara = Ember.Application.create();

Yahara.CurrentUser = Ember.Object.extend({
  token: localStorage.token,
  cardnumber: null,
  authorized: Ember.computed.bool('token'),
  error: false,
  collection: Ember.A(),

  signOut: function(){
    this.set('token', null)
    localStorage.removeItem('token')
  }
});

Yahara.currentUser = Yahara.CurrentUser.create();
