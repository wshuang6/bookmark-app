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

export const TOGGLE_ADD_FOLDER = 'TOGGLE_ADD_FOLDER';
export const toggleAddFolder = () => ({
    type: TOGGLE_ADD_FOLDER
});

export const EDIT_FOLDER = 'EDIT_FOLDER';
export const editFolder = (editing) => ({
    type: EDIT_FOLDER,
    editing
});

export const CURRENT_FOLDER = 'CURRENT_FOLDER';
export const currentFolder = (currentFolderId) => ({
    type: CURRENT_FOLDER,
    currentFolderId
})

export const fetchFolders = userid => dispatch => {
  dispatch(fetchFoldersRequest());
  return fetch(`/api/folders/${userid}`)
  .then(res => res.json())
  .then((res) => {
      dispatch(fetchFoldersSuccess(res));
  })
  .catch((err)=> {
      dispatch(fetchFoldersError(err));
  })
}

export const createFolders = (userid, postInfo) => dispatch => {
  dispatch(fetchFoldersRequest());
  return fetch(`/api/folders`, {
    method: 'post',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(postInfo)
  })
  .then(() => {
    return fetch(`/api/folders/${userid}`)})
  .then(res => res.json())
  .then((res) => {
      dispatch(fetchFoldersSuccess(res));
  })
  .catch((err)=> {
      dispatch(fetchFoldersError(err));
  })    
}

export const deleteFolders = (userid, id) => dispatch => {
  dispatch(fetchFoldersRequest());
  return fetch(`/api/folders/${id}`, {method: 'delete'})
  .then(res => fetch(`/api/folders/${userid}`))
  .then(res => res.json())
  .then((res) => {
      dispatch(fetchFoldersSuccess(res));
  })
  .catch((err)=> {
      dispatch(fetchFoldersError(err));
  })
}

export const updateFolders = (userid, id, postInfo) => dispatch => {
    dispatch(fetchFoldersRequest());
    return fetch(`/api/folders/${id}`, {
        method: 'PATCH', 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(postInfo)
    })
    .then(res => fetch(`/api/folders/${userid}`))
    .then(res => res.json())
    .then((res) => {
        dispatch(fetchFoldersSuccess(res));
    })
    .catch((err)=> {
        dispatch(fetchFoldersError(err));
    })
}