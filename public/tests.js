module("Yahara");

test("Yahara", function(){
  ok(Yahara instanceof Ember.Application, "The Yahara app is an Ember application")
});

module("Search Features", {
  setup: function() {
    localStorage.clear();
    Yahara.reset();
  }
})

test("searching for a title", function(){
  visit("/")
    .fillIn("input#search", "mike")
    .andThen(function() {
      equal(find("li.album").length, 1, "The page only has one album");
      equal(find("li.album a.album").text().trim(), "Mike Zirkel the Album", "The correct album is showing");
  });
});

test("searching for an artist", function(){
  visit("/")
    .fillIn("input#search", "gomers")
    .andThen(function() {
      equal(find("li.album").length, 1, "The page only has one album");
      equal(find("li.album a.artist").text().trim(), "The Gomers", "The correct album is showing");
  });
});

module("Album Features", {
  setup: function() {
    localStorage.clear();
    Yahara.reset();
  }
});

test("viewing an album", function(){
  visit("/")
    .click("a[href='/meat-the-zombeatles-the-zombeatles']")
    .andThen(function() {
      equal(find(".album").text(), "Meat the Zombeatles!", "The album title is visible");
  });
});

test("collecting an album", function(){
  visit("/meat-the-zombeatles-the-zombeatles")
    .click("h3:contains('Add to Your Collection')")
    .fillIn("input#card-number", "1234567")
    .click("button.login")
    .click("h3:contains('Add to Your Collection')")
    .andThen(function() {
      ok(find("h3:contains('Remove from Your Collection')").length, "The album is in your collection");
    });
});


module("Modal Features", {
  setup: function() {
    localStorage.clear();
    Yahara.reset();
  }
});

test("is hidden by default", function(){
  visit("/")
    .andThen(function() {
      equal(find("#modal").is(":visible"), false);
  });
});
