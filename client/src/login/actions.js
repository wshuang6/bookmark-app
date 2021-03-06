export const SET_USER = 'SET_USER';
export const setUser = (user) => ({
    type: SET_USER,
    email: user.email,
    userid: user.userid, 
})

export const REMOVE_USER = 'REMOVE_USER';
export const removeUser = () => ({
    type: REMOVE_USER
})

export const SET_ERROR = 'SET_ERROR';
const setError = (error) => ({
    type: SET_ERROR,
    error
})

export const SEARCH_BOOKMARKS = 'SEARCH_BOOKMARKS';
export const searchBookmarks = (results) => ({
    type: SEARCH_BOOKMARKS,
    results
})

export const TOGGLE_LOGGING_IN = 'TOGGLE_LOGGING_IN';
export const toggleLoggingIn = (loggingIn) => ({
    type: TOGGLE_LOGGING_IN,
    loggingIn
})

export const createUser = (userInfo) => dispatch => {
  return fetch(`/api/users`, {
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(userInfo)
  })
  .then(res => {
    if (!res.ok) {
        if (res.headers.get('Content-Type').includes('application/json')) {
            return res.json()
            .then(res => {
                return Promise.reject(res)
            })
        }
        return Promise.reject({message: res.statusText})
    }
    return res.json()
  })
  .then(res => {
    localStorage.setItem('email', userInfo.email);
    localStorage.setItem('password', userInfo.password);
    dispatch(setUser(res[0]))
  })
  .catch((err)=> {
        dispatch(setError(err.message));
  })
}

export const validateUser = (userInfo) => dispatch => {
    return fetch(`/api/users/login`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Basic ` + btoa(`${userInfo.email}:${userInfo.password}`)
        }, 
        body: JSON.stringify(userInfo)
    })
    .then(res => {
        if (!res.ok) {
            return Promise.reject({message: res.statusText})
        }
        return res.json()
    })
    .then(res => {
        localStorage.setItem('email', userInfo.email);
        localStorage.setItem('password', userInfo.password);
        dispatch(setUser(res[0]))
    })
    .catch((err)=> {
        dispatch(setError(err.message));
    })
}