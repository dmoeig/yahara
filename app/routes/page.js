Yahara.PageRoute = Ember.Route.extend({
  setupController: function(controller, model){
    ic.ajax.request('/pages/' + model.page).then(function(html){
      controller.set('model', html);
    });
  }
});
