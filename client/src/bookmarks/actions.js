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

export const fetchBookmarks = () => dispatch => {
  dispatch(fetchBookmarksRequest());
  return fetch(`/api/`)
  .then(res => res.json())
  .then((res) => {
      dispatch(fetchBookmarksSuccess(res));
  })
  .catch((err)=> {
      dispatch(fetchBookmarksError(err));
  })
}