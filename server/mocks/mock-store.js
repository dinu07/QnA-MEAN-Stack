
const mockGenerator = require('./mock-generator');

const TOPICS = [
    {

        name: 'Angular',
        description: mockGenerator.topicDescTemplate('Angular'),
        createdDate: new Date('2015-10-26')
    },
    {
        name: 'React',
        description: mockGenerator.topicDescTemplate('React'),
        createdDate: new Date('2016-02-01')
    },
    {
        name: 'Node',
        description: mockGenerator.topicDescTemplate('Node'),
        createdDate: new Date('2016-02-01')
    },
    {
        name: 'Mongo DB',
        description: mockGenerator.topicDescTemplate('Mongo DB'),
        createdDate: new Date('2016-02-01')
    },
    {
        name: 'Express JS',
        description: mockGenerator.topicDescTemplate('Express JS'),
        createdDate: new Date('2016-02-01')
    }
];

const QUESTIONS = [];

const COMMENTS = [].concat(...QUESTIONS.map((topic, idx) => mockGenerator.commentsGenerator(topic, 10 * ++idx)));

module.exports.COMMENTS = COMMENTS;
module.exports.TOPICS = TOPICS;
module.exports.QUESTIONS = QUESTIONS;
