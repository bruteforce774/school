const model = {
    app: {
        currentId: null,
    },    
    filesAndFolders: [
        {id: 1, name: 'Handlelister'},
        {id: 2, name: 'Ting som skal fikses'},
        {id: 3, name: 'Oktober', parentId: 1},
        {id: 4, name: 'Tirsdag 15.', parentId: 3, content: 'melk\nbrød\nost\n'},
        {id: 5, name: 'Bad', parentId: 2, content: 'Lekkasje, bla bla'},
        {id: 6, name: 'notater.txt', content: 'abc'},
    ],
};