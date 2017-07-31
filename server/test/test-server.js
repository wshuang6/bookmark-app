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
        .then(irrelevant => {
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
        .then(irrelevant => {
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
        .then(irrelevant => {
          return chai.request(app)
            .get(`/api/20`)
            .then(res => {
              res.body.length.should.equal(bookmarksLength);
            })
        })
    })

    // export const fetchFolders = userid => dispatch => {
    //   dispatch(fetchFoldersRequest());
    //   return fetch(`/api/folders/${userid}`)
    //   .then(res => res.json())
    //   .then((res) => {
    //       dispatch(fetchFoldersSuccess(res));
    //   })
    //   .catch((err)=> {
    //       dispatch(fetchFoldersError(err));
    //   })
    // }

    // export const createFolders = (userid, postInfo) => dispatch => {
    //   dispatch(fetchFoldersRequest());
    //   return fetch(`/api/folders`, {
    //     method: 'post',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     }, 
    //     body: JSON.stringify(postInfo)
    //   })
    //   .then(() => fetch(`/api/folders/${userid}`))
    //   .then(res => res.json())
    //   .then((res) => dispatch(fetchFoldersSuccess(res)))
    //   .catch((err) => dispatch(fetchFoldersError(err)))    
    // }

    // export const deleteFolders = (userid, id) => dispatch => {
    //   dispatch(fetchFoldersRequest());
    //   return fetch(`/api/folders/${id}`, {
    //       method: 'delete'
    //     })
    //   .then(res => fetch(`/api/folders/${userid}`))
    //   .then(res => res.json())
    //   .then((res) => dispatch(fetchFoldersSuccess(res)))
    //   .catch((err) => dispatch(fetchFoldersError(err)))
    // }

    // export const updateFolders = (userid, id, postInfo) => dispatch => {
    //     dispatch(fetchFoldersRequest());
    //     return fetch(`/api/folders/${id}`, {
    //         method: 'PATCH', 
    //         headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //         }, 
    //         body: JSON.stringify(postInfo)
    //     })
    //     .then(res => fetch(`/api/folders/${userid}`))
    //     .then(res => res.json())
    //     .then((res) => dispatch(fetchFoldersSuccess(res)))
    //     .catch((err) => dispatch(fetchFoldersError(err)))
    // }

  })
});