Yahara.YBlockComponent = Ember.Component.extend({
  classNames: ['y-block'],
  classNameBindings: ['expanded:expanded'],

  action: null,
  expanded: false,
  title: null,
  parameter: null,

  actions: {
    toggle: function(){
      if (this.get('action')){
        this.sendAction('action', this.get('parameter'));
      }
      else {
        this.toggleProperty('expanded');
      }
    }
  }
});
