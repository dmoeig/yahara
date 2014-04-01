Yahara.ModalController = Ember.ObjectController.extend({
  needs: 'application',

  currentUser: Ember.computed.alias("controllers.application.model"),

  previousTransition: null,

  actions: {
    open: function() {
      $('#modal').show();
    },

    close: function() {
      $('#modal').hide();
    },
    submit: function() {
      var currentUser = this.get('currentUser');
      ic.ajax.request({
        type: "POST",
        url: ENV.HOST + "/userforcard",
        data: currentUser.getProperties('cardnumber')
      }).then(function(data){
        $('#modal').hide();
        currentUser.set('token', data.private_info.token);
      }, function(data){
        console.error('The user could not be authenticated');
      });
    }
  }
});