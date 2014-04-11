Yahara.AlbumsShowController = Ember.ObjectController.extend({
  needs: ['application'],

  inCollection: function(){
    debugger
    return this.get('controllers.application.model.collection').contains(this.get('model.id'));
  }.property('controllers.application.model.collection.@each')

});
