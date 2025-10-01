exports.topicDescTemplate = (name) => {
    return `You can post your questions related to ${name} in this forum. People who know answers on the questions would reply.`;
};

exports.questionDescTemplate = (sampleId) => {
    return `This is a sample question #${sampleId} that was generated using a generator logic. Please feel free to tweak at your convenience`;
};

exports.commentDescTemplate = (sampleId) => {
    return `This is a sample comment #${sampleId}.`;
};

exports.questionGenerator = (topic) => {
    return {
        description: this.questionDescTemplate(topic.id),
        topic
    };
};

exports.questionsGenerator = (topic, limit) => {
    const questionBank = [];
    for (let idx = 1; idx <= limit; idx++) {
        questionBank.push(this.questionGenerator(topic));
    }
    return questionBank;
};

exports.commentGenerator = (question) => {
    return {
        description: this.commentDescTemplate(question.id),
        question
    };
};

exports.commentsGenerator = (question, limit) => {
    const comments = [];
    for (let idx = 1; idx <= limit; idx++) {
        comments.push(this.commentGenerator(question));
    }
    return comments;
};

