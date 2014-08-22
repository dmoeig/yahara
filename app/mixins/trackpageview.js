Yahara.GoogleAnalytics = Ember.Mixin.create({
  trackPageView: function() {
    if(window.ga && typeof window.ga === "function") {
      Ember.run.next(function() {
        var loc = window.location,
            page = loc.hash ? loc.hash.substring(1) : loc.pathname + loc.search;
        ga('send', 'pageview', page);
      });
    }
  }.observes('currentPath')
});
