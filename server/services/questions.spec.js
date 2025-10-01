const chai = require('chai');
const expect = chai.expect;

const sinon = require('sinon');
require('sinon-mongoose');

const Question = require('../models/question');
const underTest = require('./questions');

describe('services/questions', () => {

    let findByIdStub;
    let findByIdAndRemoveStub;
    let findStub;
    let saveStub;

    beforeEach(() => {
        findByIdStub = sinon.stub(Question, 'findById');
        findByIdAndRemoveStub = sinon.stub(Question, 'findByIdAndRemove');
        findStub = sinon.stub(Question, 'find');
        saveStub = sinon.stub(Question.prototype, "save");
    });

    afterEach(() => {
        findByIdStub.restore();
        findByIdAndRemoveStub.restore();
        findStub.restore();
        saveStub.restore();
    });


    it('get all Questions', (done) => {
        findStub.returns({
            sort: () => {
                return Promise.resolve([]);
            }
        });

        underTest.getAllQuestions().then((val) => {
            expect(val.length).to.equal(0);
            done();
        });
    });

    it('save Question', (done) => {
        const question = { description: 'desc'};

        saveStub.returns(Promise.resolve(question));

        underTest.saveQuestion(question).then((val) => {
            expect(val).to.equal(question);
            done();
        });
    });

    it('get Question by id', (done) => {

        findByIdStub.resolves({id: '101', description: 'desc'});

        underTest.getQuestionById('101').then((val) => {
            expect(val.id).to.equal('101');
            expect(val.description).to.equal('desc');
            done();
        });
    });

    it('delete Question by id', (done) => {
        findByIdAndRemoveStub.resolves({id: '101', description: 'desc'});

        underTest.deleteQuestionById('101').then((res) => {
            expect(res).to.be.an('object');
            done();
        });
    });
});
