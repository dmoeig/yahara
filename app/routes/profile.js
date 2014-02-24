Yahara.PofileRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    if (this.controllerFor('application').get('currentUser')) {

    }
    else {
      transition.abort();
      this.controllerFor('modal').send('open');
      this.controllerFor('modal').set('previousTransition', transition);
    }
  },

  model: function() {
    return {};
  }
});
