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
    }
}