var unlockTimer;

Meteor.methods({
    unlock: function(id) {
        Stories.update({ _id: id }, {$set:{ active_user: '' }});
        console.log("Unlocked", id);
        Meteor.clearTimeout(unlockTimer);
        return id
    },
    lock: function(id, name) {
        Stories.update({ _id: id }, {$set:{ active_user: name }});
        console.log("Locked by", name, id);
        Meteor.clearTimeout(unlockTimer);
        unlockTimer = Meteor.setTimeout( function(){
            Meteor.call("unlock", id);
        }, 5000);
        return id
    }
});
