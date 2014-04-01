module("Yahara");

test("Yahara", function(){
  ok(Yahara instanceof Ember.Application)
});

module("Search Features", {
  setup: function() {
    Yahara.reset();
  }
})

test("searching for a title", function(){
  visit("/")
    .fillIn("input#search", "mike")
    .andThen(function() {
      equal(find("li.album").length, 1);
      equal(find("li.album a.album").text().trim(), "Mike Zirkel the Album");
  });
});

test("searching for an artist", function(){
  visit("/")
    .fillIn("input#search", "gomers")
    .andThen(function() {
      equal(find("li.album").length, 1);
      equal(find("li.album a.artist").text().trim(), "The Gomers");
  });
});

module("Album Features", {
  setup: function() {
    Yahara.reset();
  }
});

test("viewing an album", function(){
  visit("/")
    .click("a[href='/meat-the-zombeatles-the-zombeatles']")
    .andThen(function() {
      equal(find(".album").text(), "Meat the Zombeatles!");
  });
});

test("collecting an album", function(){
  visit("/meat-the-zombeatles-the-zombeatles")
    .click("h3:contains('Add to Your Collection')")
    .andThen(function() {
      equal(find("#modal").is(":visible"), true);
  });
});

module("Modal Features", {
  setup: function() {
    Yahara.reset();
  }
});

test("is hidden by default", function(){
  visit("/")
    .andThen(function() {
      equal(find("#modal").is(":visible"), false);
  });
});
