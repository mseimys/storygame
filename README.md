Story game
==========

## What is this?
This is a game that allows multiple users to create a story word by word simultaneously. There are two principles here:
- You can see only the previously entered word
- Sentence is added to the story when someone enters a word ending with symbols . ? !

Live demo at http://storygame.meteor.com/

## Origin
Created in Vilnius Meteor Day Hackathon at Wix office + couple hours. Thanks [VilniusJS](http://vilniusjs.lt/) guys for organizing such a nice event.

## Design
Each story is represented as JSON document in MongoDB:
```json
{
    title: 'Fantasies running wild',
    authors: [],
    active_user: '',
    sentences: [],
    words: [
        {'text': 'Hello', 'user': 'Anonymous'}, ...
    ],
    number_of_sentences: 0
}
```
Locking and unlocking states when entering words is done server side by setting `active_user` value (not tested enough). Locks timeout in 5 seconds by default. Number of sentences is used just for sorting. Authors are appended when constructing `sentences` item out of `words`.
