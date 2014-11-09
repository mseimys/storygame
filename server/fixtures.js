if (Stories.find().count() === 0) {
    Stories.insert({
        title: 'Fantasies running wild',
        authors: [],
        active_user: '',
        sentences: [],
        words: [],
        number_of_sentences: 0
    });
    Stories.insert({
        title: 'Animal nudity',
        authors: [],
        active_user: '',
        sentences: [],
        words: [],
        number_of_sentences: 0
    });
    Stories.insert({
        title: 'Zombies ate my brain',
        authors: [],
        active_user: '',
        sentences: [],
        words: [],
        number_of_sentences: 0
    });
}
