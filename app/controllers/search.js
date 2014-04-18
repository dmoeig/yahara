Yahara.SearchController = Ember.ObjectController.extend({
  needs: 'application',
  searchString: Ember.computed.alias("controllers.application.searchString")
});
