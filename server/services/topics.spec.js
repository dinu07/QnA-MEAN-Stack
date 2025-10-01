const chai = require('chai');
const expect = chai.expect;

const sinon = require('sinon');
require('sinon-mongoose');

const Topic = require('../models/topic');
const underTest = require('./topics');

describe('services/topics', () => {

    let findByIdStub;
    let findStub;

    beforeEach(() => {
        findByIdStub = sinon.stub(Topic, 'findById');
        findStub = sinon.stub(Topic, 'find');
    });

    afterEach(() => {
        findByIdStub.restore();
        findStub.restore();
    });


    it('get all topics', (done) => {
        const resp = [{id: '100'}];

        findStub.returns({
            limit: () => {
                return {
                    sort: () => {
                        return Promise.resolve(resp);
                    }
                };
            }
        });

        underTest.getAllTopics(10).then((val) => {
            expect(val.length).to.equal(1);
            done();
        });
    });

    it('get topic by id', (done) => {

        findByIdStub.resolves({id: '101', description: 'desc'});

        underTest.getTopicById('101').then((val) => {
            expect(val.id).to.equal('101');
            expect(val.description).to.equal('desc');
            done();
        });
    });
});
