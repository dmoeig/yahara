export default Ember.Route.extend({
  beforeModel: function(transition) {
    if (this.controllerFor('application').get('currentUser')) {

    }
    else {
      transition.abort();
      this.controllerFor('modal').send('open');
    }
  },

  model: function() {
    return {};
  }
});
