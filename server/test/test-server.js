const server = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('../index');
const faker = require('faker');

const should = chai.should();
chai.use(chaiHttp);

//test@test
//test
//id: 20

describe('server', function () {
  before(function () {
    return runServer();
  });

  after(function () {
    return closeServer();
  });

  describe('bookmarks endpoints', function () {
    let bookmarksLength;
    it('should get the users bookmarks', function () {
      return chai.request(app)
        .get(`/api/20`)
        .then(res => {
          console.log('res', res.body)
          bookmarksLength = res.body.length;
          res.should.be.json;
        })
    });

    let fakeBookmark = {
      url: `http://${faker.random.word()}.com`,
      title: faker.random.word(),
      notes: faker.random.words(),
      folderid: null,
      image: null,
      userid: 20
    }
    let fakeBookmarkTwo = {
      url: `http://${faker.random.word()}.com`,
      title: faker.random.word(),
      notes: faker.random.words(),
      folderid: null,
      image: null,
      userid: 20
    }
    let bookmarkId;

    it('should create bookmarks', function () {
      return chai.request(app)
        .post(`/api/`)
        .send(fakeBookmark)
        .then(res => {
          bookmarkId = res.body[0].bookmarkid;
          console.log('res', res.body)
        })
        .then(() => {
          return chai.request(app)
            .get(`/api/20`)
            .then(res => {
              res.body.length.should.equal(bookmarksLength + 1);
            })
        })
    })

    it('should update bookmarks', function () {
      return chai.request(app)
        .patch(`/api/${bookmarkId}`)
        .send(fakeBookmarkTwo)
        .then(res => {
          console.log('res', res.body)
        })
        .then(() => {
          return chai.request(app)
            .get(`/api/20`)
            .then(res => {
              res.body.length.should.equal(bookmarksLength + 1);
            })
        })
    })

    it('should delete bookmarks', function () {
      return chai.request(app)
        .delete(`/api/${bookmarkId}`)
        .then(res => {
          console.log(res.text)
          res.text.should.equal('delete was successful')
        })
        .then(() => {
          return chai.request(app)
            .get(`/api/20`)
            .then(res => {
              res.body.length.should.equal(bookmarksLength);
            })
        })
    })

    let foldersLength;
    it('should get folders', function () {
      return chai.request(app)
        .get(`/api/folders/20`)
        .then(res => {

        })
    })

    let fakeFolder;
    let fakeFolderTwo;
    let postId;

    it('should create folders', function () {
      return chai.request(app)
        .post(`/api/folders`)
        .send(fakeFolder)
        .then(res => {

        })
        .then(() => {
          return chai.request(app)
            .get(`/api/folders/20`)
            .then(res => {

            })
        })
    })

    it('should update bookmarks', function () {
      return chai.request(app)
        .patch(`/api/folders/${postId}`)
        .send(fakeFolderTwo)
        .then(res => {

        })
        .then(() => {
          return chai.request(app)
            .get(`/api/folders/20`)
            .then(res => {

            })
        })
    })

    it('should delete folders', function () {
      return chai.request(app)
        .delete(`/api/folders/${postId}`)
        .then(res => {

        })
        .then(() => {
          return chai.request(app)
            .get(`/api/folders/20`)
            .then(res => {

            })
        })
    })
  })
});