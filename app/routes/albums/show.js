import Album from "appkit/models/album";

export default Ember.Route.extend({
  model: function(params) {
    return Album.find(params.id);
  }
});