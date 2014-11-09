UI.registerHelper('lastWord', function(context, options) {
  if(context) {
      if (context.length > 0)
          return context[context.length-1]
  }
});
UI.registerHelper('arrayLength', function(context, options) {
  if(context) {
      return context.length;
  }
});

Template.storiesList.helpers({
    stories: Stories.find()
});

Template.storyPage.helpers({
    isDisabled: function() {
        var storyteller = Session.get("user");
        var locker = this.active_user;
        //console.log("Who has lock:", locker);
        //console.log("You are:", storyteller);
        if (!locker || locker === storyteller) return "";
        return 'disabled';
    }
});

Template.name_form.events({
    'blur #storyteller': function(event, template) {
        var input = event.target;
        Session.set("user", input.value);
        console.log("Your new name:", input.value);
        return true;
    }
});
Template.name_form.helpers({
    current_user: function() {
        return Session.get("user")
    }
})

Template.newStory.events({
    'click #create_story': function(event, template) {
        var title = template.find('#new_story_title').value;
        if (!title) return;
        Stories.insert({
            title: title,
            authors: [],
            words: [],
            sentences: [],
            number_of_sentences: 0
        });
        return false;
    }
});

Template.storyPage.events({
    'keypress #new_word_text': function(event, template) {
        var storyteller = Session.get("user");
        if (event.charCode == 13) {
            event.stopPropagation();
            var nw_element = document.getElementById("new_word_text"),
                new_word_text = nw_element.value,
                last_char = new_word_text[new_word_text.length-1];
            if (!storyteller) {
                alert("Please enter your name!");
                return;
            }
            if (new_word_text.replace(/ /g,'').length === 0) {
                // just spaces
            } else if (last_char === "." || last_char === '!' || last_char === '?') {
                this.words.push({text: new_word_text, user: storyteller});
                var sentence = "";
                for (var i = 0; i < this.words.length; i++) {
                    sentence += this.words[i]['text'] + " ";
                    if (this.authors.indexOf(this.words[i]['user']) == -1) {
                        this.authors.push(this.words[i]['user'])
                    }
                }
                this.number_of_sentences += 1
                //console.log("New sentence added:", sentence, this.authors, this.number_of_sentences);
                Stories.update({ _id: this._id },{ $push: { sentences: sentence},
                                                 $set:  { words: [], authors: this.authors,
                                                     number_of_sentences: this.number_of_sentences}
                                             });
            } else {
                Stories.update({ _id: this._id },{ $push: { words: {text: new_word_text, user: storyteller}}});
            }
            nw_element.value = '';
            Meteor.call('unlock', this._id);
            return true;
        }
        else {
            Meteor.call('lock', this._id, Session.get("user"));
        }
    }
});
