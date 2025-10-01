const express = require("express");
const request = require("supertest");

const sinon = require("sinon");

const commentsApi = require('../services/comments');
const questionsApi = require('../services/questions');

const underTest = require('./question');

describe("routes/question", () => {
    let server;

    beforeEach(next => {
        server = express()
            .use(require("body-parser").json())
            .use("/", underTest)
            .listen(next);
    });

    afterEach(() => {
        server.close();
    });

    describe("should be able to", () => {
        describe("GET all questions", () => {
            const questionInTopicResp = [{ id: "100" }];
            let getAllQuestionsStub;

            beforeEach(() => {
                getAllQuestionsStub = sinon.stub(questionsApi, "getAllQuestions");
            });

            afterEach(() => {
                getAllQuestionsStub.restore();
            });

            it("on success", (done) => {
                getAllQuestionsStub.resolves(questionInTopicResp);

                request(server)
                    .get("/")
                    .expect("Content-Type", /json/)
                    .expect(200, questionInTopicResp)
                    .end(done);
            });

            it("on failure", (done) => {
                getAllQuestionsStub.rejects(new Error());

                request(server)
                    .get("/")
                    .expect(500)
                    .end(done);
            });
        });

        describe("GET existing question by id", () => {
            let getQuestionByIdStub;

            beforeEach(() => {
                getQuestionByIdStub = sinon.stub(questionsApi, "getQuestionById");
            });

            afterEach(() => {
                getQuestionByIdStub.restore();
            });

            it("on success", (done) => {
                const resp = { _id: "100" };
                getQuestionByIdStub.resolves(resp);

                request(server)
                    .get("/100")
                    .expect("Content-Type", /json/)
                    .expect(200, resp)
                    .end(done);
            });

            it("on failure", (done) => {
                getQuestionByIdStub.rejects({});

                request(server)
                    .get("/100")
                    .expect(500)
                    .end(done);
            });
        });

        describe('DELETE question by id', () => {
            let stub;

            beforeEach(() => {
                stub = sinon.stub(questionsApi, "deleteQuestionById");
            });

            afterEach(() => {
                stub.restore();
            });

            it('on success', (done) => {
                stub.resolves({ id: "100" });

                request(server)
                    .delete("/100")
                    .expect(200)
                    .end(done);
            });

            it('on failure', (done) => {
                stub.rejects(new Error());

                request(server)
                    .delete("/100")
                    .expect(500)
                    .end(done);
            });
        });

        describe('GET comments on a question', () => {
            let stub;

            beforeEach(() => {
                stub = sinon.stub(commentsApi, 'getAllComments');
            });

            afterEach(() => {
                stub.restore();
            });

            it('on success', (done) => {
                const resp = [];

                stub.resolves(resp);

                request(server)
                    .get("/5b17aac1e7f23a26d07f8394/comments")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .end(done);
            });

            it('on failure', (done) => {
                stub.rejects(new Error());

                request(server)
                    .get("/5b17aac1e7f23a26d07f8394/comments")
                    .expect(500)
                    .end(done);
            });
        });

        describe('POST a new comment on a question', () => {
            let stub;

            beforeEach(() => {
                stub = sinon.stub(commentsApi, "saveComment");
            });

            afterEach(() => {
                stub.restore();
            });

            it('on success', (done) => {
                stub.returns(Promise.resolve({}));

                request(server)
                    .post("/5b17aac1e7f23a26d07f8394/comments")
                    .send({ description: "test" })
                    .expect(201)
                    .end(done);
            });

            it('on failure', (done) => {
                stub.rejects(new Error());

                request(server)
                    .post("/5b17aac1e7f23a26d07f8394/comments")
                    .send({ description: "test" })
                    .expect(500)
                    .end(done);
            });
        });
    });
});
