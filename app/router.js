Yahara.Router.map(function() {
  this.resource('albums', { path: '/' }, function () {
    this.route('show', {path: ':slug'});
  });
  this.resource('artist', { path: '/artist/:slug'});
  this.route('catalog');
  this.route('collection');
  this.route('profile');
});
