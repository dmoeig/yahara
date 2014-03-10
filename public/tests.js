module("Yahara");

test("Application instance", function(){
  ok(Yahara instanceof Ember.Application)
});

module("Integration Tests", {
  setup: function() {
    Yahara.reset();
  }
});

test("album page", function(){
  visit("/")
    .click("a[href='/meat-the-zombeatles-the-zombeatles']")
    .andThen(function() {
    equal(find(".album").text(), "Meat the Zombeatles!");
  });
});

test("modal is hidden by default", function(){
  visit("/")
    .andThen(function() {
    equal(find("#modal").is(":visible"), false);
  });
});