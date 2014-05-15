Yahara = Ember.Application.create();

Yahara.initializer({
  name: "soundmanager",
  initialize: function() {
    soundManager.setup({
      url: '/swf',
      preferFlash: true
    });
  }
});
