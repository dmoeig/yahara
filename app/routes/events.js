Yahara.EventsRoute = Ember.Route.extend({

  model: function() {
    return ic.ajax.request(ENV.HOST + "/events");
  }
});
