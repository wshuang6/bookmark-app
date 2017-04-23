export const FETCH_BOOKMARKS_REQUEST = 'FETCH_BOOKMARKS_REQUEST';
const fetchBookmarksRequest = () => ({
    type: FETCH_BOOKMARKS_REQUEST
});

export const FETCH_BOOKMARKS_SUCCESS = 'FETCH_BOOKMARKS_SUCCESS';
const fetchBookmarksSuccess = (bookmarks) => ({
    type: FETCH_BOOKMARKS_SUCCESS,
    bookmarks
});

export const FETCH_BOOKMARKS_ERROR = 'FETCH_BOOKMARKS_ERROR';
const fetchBookmarksError = (error) => ({
    type: FETCH_BOOKMARKS_ERROR,
    error
})

export const TOGGLE_ADD_BOOKMARK = 'TOGGLE_ADD_BOOKMARK';
export const toggleAddBookmark = () => ({
    type: TOGGLE_ADD_BOOKMARK
});

export const EDIT_BOOKMARK = 'EDIT_BOOKMARK';
export const editBookmark = (editing) => ({
    type: EDIT_BOOKMARK,
    editing
});

export const fetchBookmarks = userid => dispatch => {
  dispatch(fetchBookmarksRequest());
  return fetch(`/api/${userid}`)
  .then(res => res.json())
  .then((res) => {
      dispatch(fetchBookmarksSuccess(res));
  })
  .catch((err)=> {
      dispatch(fetchBookmarksError(err));
  })
}

export const createBookmarks = (userid, postInfo) => dispatch => {
  dispatch(fetchBookmarksRequest());
  return fetch(`/api/`, {
    method: 'post',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(postInfo)
  })
  .then(() => {
    return fetch(`/api/${userid}`)
    })
  .then(res => res.json())
  .then((res) => {
      dispatch(fetchBookmarksSuccess(res));
  })
  .catch((err)=> {
      dispatch(fetchBookmarksError(err));
  })    
}

export const deleteBookmarks = (userid, id) => dispatch => {
  dispatch(fetchBookmarksRequest());
  return fetch(`/api/${id}`, {method: 'delete'})
  .then(res => fetch(`/api/${userid}`))
  .then(res => res.json())
  .then((res) => {
      dispatch(fetchBookmarksSuccess(res));
  })
  .catch((err)=> {
      dispatch(fetchBookmarksError(err));
  })
}

export const updateBookmarks = (userid, id, postInfo) => dispatch => {
    dispatch(fetchBookmarksRequest());
    return fetch(`/api/${id}`, {
        method: 'PATCH', 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(postInfo)
    })
    .then(res => fetch(`/api/${userid}`))
    .then(res => res.json())
    .then((res) => {
        dispatch(fetchBookmarksSuccess(res));
    })
    .catch((err)=> {
        dispatch(fetchBookmarksError(err));
    })
}