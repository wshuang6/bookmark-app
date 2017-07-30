const server = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('../index');

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
    it('should get the users bookmarks', function () {
      return chai.request(app)
        .get(`/api/20`)
        .then(res => {
          console.log('res', res)
          res.should.be.json;
        })
    });

    // export const createBookmarks = (userid, postInfo) => dispatch => {
    //   dispatch(fetchBookmarksRequest());
    //   return fetch(`/api/`, {
    //     method: 'post',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     }, 
    //     body: JSON.stringify(postInfo)
    //   })
    //   .then(() => fetch(`/api/${userid}`))
    //   .then(res => res.json())
    //   .then((res) => dispatch(fetchBookmarksSuccess(res)))
    //   .catch((err)=> dispatch(fetchBookmarksError(err)))    
    // }
    it('should create bookmarks', function () {
      return chai.request(app)
        .post(`/api/20`)
        .send()
        .then(res => {
          console.log('res', res)
        })
    })


    // export const deleteBookmarks = (userid, id) => dispatch => {
    //   dispatch(fetchBookmarksRequest());
    //   return fetch(`/api/${id}`, {method: 'delete'})
    //   .then(res => fetch(`/api/${userid}`))
    //   .then(res => res.json())
    //   .then((res) => dispatch(fetchBookmarksSuccess(res)))
    //   .catch((err)=> dispatch(fetchBookmarksError(err)))
    // }

    it('should delete bookmarks', function () {
      return chai.request(app)
        .delete(`/api/20`)
        .then(res => {

        })
    })


    //     export const updateBookmarks = (userid, id, postInfo) => dispatch => {
    //     dispatch(fetchBookmarksRequest());
    //     return fetch(`/api/${id}`, {
    //         method: 'PATCH', 
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }, 
    //         body: JSON.stringify(postInfo)
    //     })
    //     .then(res => fetch(`/api/${userid}`))
    //     .then(res => res.json())
    //     .then((res) => dispatch(fetchBookmarksSuccess(res)))
    //     .catch((err)=> dispatch(fetchBookmarksError(err)))
    // }

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