export default dummyData = {
    React: {
        id: 1,
        title: 'React',
        color: '#FF33A7',
        cards: [
            {
                question: 'What is React?',
                answers: {
                    'right': 'A library for managing user interfaces',
                    'wrong': [
                        'A JavaScript framework',
                        'A UI JavaScript Kit'
                    ]
                }
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answers: {
                    'right': 'The componentDidMount lifecycle event.',
                    'wrong': [
                        'In the render lifecycle event.',
                        'In a stateless component.'
                    ]
                }
            }
        ]
    },
    JavaScript: {
        id: 2,
        title: 'JavaScript',
        color: '#FE4781',
        cards: [
            {
                question: 'What is a closure?',
                answers: {
                    'right': 'The combination of a function and the lexical environment within which that function was declared.',
                    'wrong': [
                        'A function that calls itself until it doesn\'t anymore',
                        'The global scope of a function.'
                    ]
                }
            }
        ]
    },
    Culture: {
        id: 3,
        title: 'Culture',
        color: '#AC3B60',
        cards: [
            {
                question: 'What is the longest river in Australia?',
                answers: {
                    'right': 'The Murray River',
                    'wrong': ['River Plate', 'Aloha National River']
                }
            },
            {
                question: 'Which wedding anniversary is traditionally referred to as the golden wedding anniversary?',
                answers: {
                    'right': '50th',
                    'wrong': [ '45th', '60th']
                }
            },
            {
                question: 'What ingredient is added to white sugar to make brown sugar?',
                answers: {
                    'right': 'Molasses',
                    'wrong': ['Honey', 'Cinamon']
                }
            },
            {
                question: 'What is the name for the branch of mathematics dealing with lengths and angles of triangles.',
                answers: {
                    'right': 'Trigonometry',
                    'wrong': ['Geometry', 'Alchemy']
                }
            }
        ]
    }
}