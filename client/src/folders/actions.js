export const FETCH_FOLDERS_REQUEST = 'FETCH_FOLDERS_REQUEST';
const fetchFoldersRequest = () => ({
    type: FETCH_FOLDERS_REQUEST
});

export const FETCH_FOLDERS_SUCCESS = 'FETCH_FOLDERS_SUCCESS';
const fetchFoldersSuccess = (folders) => ({
    type: FETCH_FOLDERS_SUCCESS,
    folders
});

export const FETCH_FOLDERS_ERROR = 'FETCH_FOLDERS_ERROR';
const fetchFoldersError = (error) => ({
    type: FETCH_FOLDERS_ERROR,
    error
})

export const fetchFolders = () => dispatch => {
  dispatch(fetchFoldersRequest());
  return fetch(`/api/folders`)
  .then(res => res.json())
  .then((res) => {
      dispatch(fetchFoldersSuccess(res));
  })
  .catch((err)=> {
      dispatch(fetchFoldersError(err));
  })
}
