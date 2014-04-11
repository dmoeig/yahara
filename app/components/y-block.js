Yahara.YBlockComponent = Ember.Component.extend({
  classNames: ['y-block'],
  classNameBindings: ['expanded:expanded'],

  action: null,
  expanded: false,
  title: null,

  actions: {
    toggle: function(){
      if (this.get('action')){
        this.sendAction();
      }
      else {
        this.toggleProperty('expanded');
      }
    }
  }
});
