module("Yahara");

test("Application instance", function(){
  ok(Yahara instanceof Ember.Application)
});

module("Integration Tests", {
  setup: function() {
    Yahara.reset();
  }
});

test("setup", function(){
  visit("/")
    .click("a[href='/meat-the-zombeatles-the-zombeatles']")
    .andThen(function() {
    equal(find(".album").text(), "Meat the Zombeatles!");
  });
});