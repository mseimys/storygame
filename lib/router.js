Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { return Meteor.subscribe('stories'); }
});
Router.route('/', {name: 'storiesList'});
Router.route('/stories/:_id', {
    name: 'storyPage',
    data: function() {
        return Stories.findOne(this.params._id) 
    }
});
