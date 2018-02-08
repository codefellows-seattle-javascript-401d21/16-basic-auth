'use strict';

require('jest');
const faker = require('faker');
const superagent = require('superagent');
const server = require('../../lib/server');
const mocks = require('../lib/mocks');
const path = `:${process.env.PORT}/api/v1/note`;

describe('PUT /api/v1/note', () => {
    beforeAll(server.start);
    beforeAll(() => mocks.auth.createOne().then(data => this.mockUser = data));
    beforeAll(() => mocks.note.createOne().then(data => this.mockNote = data));

    afterAll(mocks.auth.removeAll);
    afterAll(mocks.note.removeAll);
    afterAll(server.stop);

    it('should return status 204 for a put request with a valid body', () => {
        return superagent.put(`${path}/${this.mockNote.note._id}`)
            .set('Authorization', `Bearer ${this.mockUser.token}`)
            .send({
                name: 'cats',
            })
            .then(res => {
                expect(res.status).toBe(204);
            });
    });

    it('should return status 401 if invalid token was provided', () => {
        return superagent.put(`${path}/${this.mockNote.note._id}`)
            .set('Authorization', `Bearer cats`)
            .send({
                name: 'cats',
            })
            .catch(err => expect(err.status).toBe(401));
    });

    it('should return status 400 for a put request with an invalid body', () => {
        return superagent.put(`${path}/${this.mockNote.note._id}`)
            .set('Authorization', `Bearer ${this.mockUser.token}`)
            .send({
                cats: 'cats',
            })
            .catch(err => expect(err.status).toBe(400));
    });

    it('should return status 404 for a put request with an invalid ID', () => {
        return superagent.put(`${path}/cats`)
            .set('Authorization', `Bearer ${this.mockUser.token}`)
            .send({
                name: 'cats',
            })
            .catch(err => expect(err.status).toBe(404));
    });
});


// 'use strict';

// const faker = require('faker');
// const mocks = require('../lib/mocks');
// const superagent = require('superagent');
// const server = require('../../lib/server');
// require('jest');

// // describe('PUT /api/v1/note', function () {
//     beforeAll(server.start);
//     // beforeAll(() => mocks.auth.createOne().then(data => this.mockUser = data))
//     beforeAll(() => mocks.note.createOne().then(data => this.mockData = data));
//     afterAll(server.stop);
//     afterAll(mocks.auth.removeAll);
//     afterAll(mocks.note.removeAll);

//     describe('Valid request', () => {

//         it('should update an existing record', () => {
//             // console.log(this.mockData)
//             let updated = {
//                 name: 'pajamas',
//                 content: 'fire trucks',
//             };

//             return superagent.put(`:${process.env.PORT}/api/v1/note/${this.mockData.note._id}`)
//                 .set('Authorization', `Bearer ${this.mockData.token}`)
//                 .send(updated)
//                 .then(res => expect(res.status).toEqual(204))
//                 .catch(err => new Error(err));
//         });
//     });
// });