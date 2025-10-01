const chai = require('chai');
const expect = chai.expect;

const sinon = require('sinon');
require('sinon-mongoose');

const Comment = require('../models/comment');
const underTest = require('./comments');

describe('services/comments', () => {

    let findByIdStub;
    let findByIdAndRemoveStub;
    let findStub;
    let saveStub;

    beforeEach(() => {
        findByIdStub = sinon.stub(Comment, 'findById');
        findByIdAndRemoveStub = sinon.stub(Comment, 'findByIdAndRemove');
        findStub = sinon.stub(Comment, 'find');
        saveStub = sinon.stub(Comment.prototype, "save");
    });

    afterEach(() => {
        findByIdStub.restore();
        findByIdAndRemoveStub.restore();
        findStub.restore();
        saveStub.restore();
    });


    it('get all Comments', (done) => {
        findStub.returns({
            sort: () => {
                return Promise.resolve([]);
            }
        });

        underTest.getAllComments().then((val) => {
            expect(val.length).to.equal(0);
            done();
        });
    });

    it('save Comment', (done) => {
        const comment = { description: 'desc'};

        saveStub.returns(Promise.resolve(comment));

        underTest.saveComment(comment).then((val) => {
            expect(val).to.equal(comment);
            done();
        });
    });

    it('get Comment by id', (done) => {

        findByIdStub.resolves({id: '101', description: 'desc'});

        underTest.getCommentById('101').then((val) => {
            expect(val.id).to.equal('101');
            expect(val.description).to.equal('desc');
            done();
        });
    });

    it('delete Comment by id', (done) => {
        findByIdAndRemoveStub.resolves({id: '101', description: 'desc'});

        underTest.deleteCommentById('101').then((res) => {
            expect(res).to.be.an('object');
            done();
        });
    });


});
