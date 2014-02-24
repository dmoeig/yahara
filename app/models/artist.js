Yahara.Artist = Ember.Model.extend({
  id: Ember.attr(),
  name: Ember.attr()
});

Yahara.Artist.adapter = Yahara.Adapter.create();