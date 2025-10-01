const express = require('express');
const request = require('supertest');

const sinon = require('sinon');

const topicsApi = require('../services/topics');
const questionsApi = require('../services/questions');

const underTest = require('./topic');

describe('routes/topic', () => {
    let server;

    beforeEach((next) => {
        server = express()
            .use(require('body-parser').json())
            .use('/', underTest)
            .listen(next);
    });

    afterEach(() => {
        server.close();
    });

    describe('should be able to', () => {
        describe('GET all topics', () => {
            let stub;

            beforeEach(()=>{
                stub = sinon.stub(topicsApi, 'getAllTopics');
            });

            afterEach(()=>{
                stub.restore();
            });

            it('on success', (done) => {
                const resp = [{id: '100'}];

                stub.resolves(resp);

                request(server)
                    .get('/')
                    .expect('Content-Type', /json/)
                    .expect(200, [{id: '100'}])
                    .end(done);
            });

            it('on failure', (done) => {
                stub.rejects(new Error());

                request(server)
                    .get('/')
                    .expect(500)
                    .end(done);
            });

        });

        describe('GET existing topic by id', () => {
            let stub;

            beforeEach(()=>{
                stub = sinon.stub(topicsApi, 'getTopicById');
            });

            afterEach(()=>{
                stub.restore();
            });

            it('on success', (done) => {
                const resp = {id: '100'};

                stub.resolves(resp);

                request(server)
                    .get('/100')
                    .expect('Content-Type', /json/)
                    .expect(200, resp)
                    .end(done);
            });

            it('on failure', (done) => {
                stub.rejects(new Error());

                request(server)
                    .get('/100')
                    .expect(500)
                    .end(done);
            });
        });

        describe('GET questions in a topic', () => {
            let stub;
            beforeEach(()=>{
                stub = sinon.stub(questionsApi, 'getAllQuestions');
            });

            afterEach(()=>{
                stub.restore();
            });

            it('on success', (done) => {
                const resp = [];

                stub.resolves(resp);

                request(server)
                    .get('/5b17aac1e7f23a26d07f8394/questions')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(done);
            });

            it('on failure', (done) => {

                stub.rejects(new Error());

                request(server)
                    .get('/5b17aac1e7f23a26d07f8394/questions')
                    .expect(500)
                    .end(done);
            });
        });

        describe('POST a new question under a topic', () => {
            let stub;
            beforeEach(()=>{
                stub = sinon.stub(questionsApi, 'saveQuestion');
            });

            afterEach(()=>{
                stub.restore();
            });

            it('on success', (done) => {
                const data = {description: 'test'};

                stub.resolves(data);

                request(server)
                    .post('/5b17aac1e7f23a26d07f8394/questions/')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .send(data)
                    .expect(201)
                    .end(done);
            });

            it('fails', (done) => {
                const data = {description: 'test'};

                stub.rejects(new Error());

                request(server)
                    .post('/5b17aac1e7f23a26d07f8394/questions/')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .send(data)
                    .expect(500)
                    .end(done);
            });
        });
    });
});
