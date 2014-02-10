import Album from "appkit/models/album";

export default Ember.Route.extend({
  model: function() {
    return Album.fetch();
  }
});
