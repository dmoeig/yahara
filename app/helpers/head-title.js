Ember.Handlebars.helper('headTitle', function(title) {
  Ember.$('head').find('title').text(title);
}, 'title');