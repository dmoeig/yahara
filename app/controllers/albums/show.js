Yahara.AlbumsShowController = Ember.ObjectController.extend({
  needs: ['application'],

  inCollection: function(){
    return this.get('controllers.application.model.collection_ids').contains(this.get('model.mprint.origin'));
  }.property('controllers.application.model.collection.@each', 'model.mprint.origin'),

});
