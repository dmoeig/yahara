module("Yahara");

Yahara.setupForTesting();
Yahara.injectTestHelpers();

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
      equal(find("input#search")[0].value, "mike");
      equal(currentURL(), '/album/mike-zirkel-the-album-the-gomers', "Transitioned to the album page")
      equal(find("h3.album").text().trim(), "Mike Zirkel the Album", "The correct album is showing");
  });
});

test("searching for an artist", function(){
  visit("/")
    .fillIn("input#search", "gomers")
    .andThen(function() {
      equal(currentURL(), '/album/mike-zirkel-the-album-the-gomers', "Transitioned to the album page")
      equal(find("a.artist").text().trim(), "The Gomers", "The correct album is showing");
  });
});

module("Login Features", {
  setup: function() {
    localStorage.clear();
    Yahara.reset();
  }
});

test("log in success", function(){
  visit("/")
    .click("a[href='/login']")
    .fillIn("input#card-number", "1234567")
    .click("button.login")
    .andThen(function() {
      equal(find("a[href='/logout']:visible").length, 1, "The logout button is visible");
      equal(find("a[href='/collection']:visible").length, 1, "The my collection button is visible");
  });
});

test("log in failure", function(){
  visit("/")
    .click("a[href='/login']")
    .fillIn("input#card-number", "fail")
    .click("button.login")
    .andThen(function() {
      equal(find("#modal").is(":visible"), true, "The modal is still visible");
      equal(find(".flash-login").is(":visible"), true, "The error message is visible");
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
    .click("a[href='/album/meat-the-zombeatles-the-zombeatles']")
    .andThen(function() {
      equal(find(".album").text(), "Meat the Zombeatles!", "The album title is visible");
  });
});

test("collecting and removing an album", function(){
  visit("/album/meat-the-zombeatles-the-zombeatles")
    .click("h3:contains('Add to Your Collection')")
    .fillIn("input#card-number", "1234567")
    .click("button.login")
    .click("h3:contains('Add to Your Collection')")
    .click("a[href='/collection']")
    .andThen(function() {
      equal(find("li.album").length, 1, "The page only has one album");
      equal(find("li.album a.album").text().trim(), "Meat the Zombeatles!", "The correct album is showing");
    })
    .visit("/album/meat-the-zombeatles-the-zombeatles")
    .click("h3:contains('Remove from Your Collection')")
    .visit("/collection")
    .andThen(function() {
      equal(find("li.album").length, 0, "Collection is empty");
    })
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
      equal(find("#modal").is(":visible"), false, "The modal is hidden");
  });
});
