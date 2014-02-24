define("appkit/tests/acceptance/index_test", 
  [],
  function() {
    "use strict";
    var App;

    module('Acceptances - Index', {
      setup: function(){
        App = startApp();
      },
      teardown: function() {
        Ember.run(App, 'destroy');
      }
    });

    test('index renders', function(){
      expect(2);

      visit('/').then(function(){
        var title = find('h1');

        var links = find('a');
        equal(links.length, 4);
        equal(title.text(), 'Yahara');

      });
    });
  });