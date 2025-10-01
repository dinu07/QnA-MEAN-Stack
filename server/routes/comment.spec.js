const express = require('express');
const request = require('supertest');

const sinon = require('sinon');

const commentsApi = require('../services/comments');
const underTest = require('./comment');

describe('routes/comment', () => {
    let server;

    beforeEach((next) => {
        server = express()
            .use('/', underTest)
            .listen(next);
    });

    afterEach(() => {
        server.close();
    });

    describe('should be able to', () => {
        describe('GET comment by id', () => {
            let getCommentByIdStub;

            beforeEach(() => {
                getCommentByIdStub = sinon.stub(commentsApi, 'getCommentById');
            });

            afterEach(() => {
                getCommentByIdStub.restore();
            });

            it('on success', (done) => {

                getCommentByIdStub.resolves({id: '101', description: 'desc'});

                request(server)
                    .get('/101')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(done);
            });

            it('on failure', (done) => {

                getCommentByIdStub.rejects({});

                request(server)
                    .get('/101')
                    .expect(500)
                    .end(done);
            });
        });

        describe('DELETE comment by id', () => {

            let deleteCommentByIdStub;

            beforeEach(() => {
                deleteCommentByIdStub = sinon.stub(commentsApi, 'deleteCommentById');
            });

            afterEach(() => {
                deleteCommentByIdStub.restore();
            });

            it('on success', (done) => {
                deleteCommentByIdStub
                    .resolves({id: '101', description: 'desc'});

                request(server)
                    .delete('/101')
                    .expect(200)
                    .end(done);
            });

            it('on failure', (done) => {
                deleteCommentByIdStub
                    .rejects({});

                request(server)
                    .delete('/101')
                    .expect(500)
                    .end(done);
            });
        });
    });
});
