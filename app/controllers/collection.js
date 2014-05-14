Yahara.CollectionController = Ember.ArrayController.extend({
  collectionEmpty: Ember.computed.empty('content.[]')
});
