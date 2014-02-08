var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.resource('album', { path: '/album/:id' });
  this.resource('artist', { path: '/artist/:id'});
  this.route('catalog');
  this.route('collection');
  this.route('profile');
});

export default Router;
