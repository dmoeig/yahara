Yahara.YBlockComponent = Ember.Component.extend({
  classNames: ['y-block'],

  expanded: false,
  title: null,

  actions: {
    toggle: function(){
      this.toggleProperty('expanded');
    }
  }
});