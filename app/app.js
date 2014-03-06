Yahara = Ember.Application.create();

Yahara.CurrentUser = Ember.Object.extend({
  token: null,
  cardnumber: null,
  authorized: Ember.computed.bool('token')
});

Yahara.currentUser = Yahara.CurrentUser.create();