Meteor.publish('stories', function() {
    return Stories.find({}, {sort: [["number_of_sentences", "desc"]]});
});
