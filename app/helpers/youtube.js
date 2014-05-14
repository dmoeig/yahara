Ember.Handlebars.helper('youtube', function(url) {
  var id = url.match(/v=(\S+)/)[1];
  return new Ember.Handlebars.SafeString('<div class="youtube-embed"><iframe src="//www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen></iframe></div>');
});
