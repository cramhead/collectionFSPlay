Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});


Router.map(function() {

  this.route('home', {
    path: '/',
    template: 'home',
    before: function(){
      Meteor.subscribe('items');
      Meteor.subscribe('images');
    }
  });
});