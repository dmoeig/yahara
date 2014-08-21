Yahara.AlbumsShowController = Ember.ObjectController.extend({
  needs: ['application'],

  inCollection: function(){
    return this.get('controllers.application.model.collection_ids').contains(this.get('model.mprint.origin'));
  }.property('controllers.application.model.collection.@each', 'model.mprint.origin'),

  actions: {
    download: function(download){
      if(window.ga && typeof window.ga === "function") {
        ga('send','event','Download', 'click', download, 1);
      }
    },
    playPause: function(firstTrack){
      if(window.ga && typeof window.ga === "function") {
        ga('send','event','Streaming','play',firstTrack,1);
      }
    },
    purchase: function(purchase){
      if(window.ga && typeof window.ga === "function") {
        ga('send','event','Options to Purchase','click',purchase,1);
      }
    }
  }

});
