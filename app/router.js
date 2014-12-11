Yahara.Router.map(function() {
  this.resource('albums', { path: '/' }, function () {
    this.route('show', { path: '/album/:slug'});
  });
  this.resource('artist', { path: '/artist/:artistSlug'});
  this.route('catalog');
  this.route('collection');
  this.route('profile');
  this.route('events');
  this.route('page', { path: '/:page'} );
});

Yahara.Router.reopen({
  location: 'auto'
});
