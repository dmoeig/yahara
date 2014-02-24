var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.resource('albums', { path: '/' }, function () {
    this.route('show', {path: ':id'});
  });
  this.resource('artist', { path: '/artist/:id'});
  this.route('catalog');
  this.route('collection');
  this.route('profile');
});

export default Router;
