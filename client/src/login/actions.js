export const SET_USER = 'SET_USER';
export const setUser = (user) => ({
    type: SET_USER,
    email: user.email,
    userid: user.userid
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
                        console.log(res)
                        console.log(res.headers)
          if (res.headers.get('Content-Type').includes('application/json')) {

              console.log(res.json())
            return Promise.reject(res.json())
          }
          console.log('not a JSON error')
          return Promise.reject({message: res.statusText})
      }
      return res.json()
  })
  .then(res => {
      console.log(res)
      dispatch(setUser(res[0]))
  })
  .catch((err)=> {
      console.log(err);
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
    .then(res => res.json())
    .then(res => {
        console.log(res[0])
        dispatch(setUser(res[0]))
    })
    .catch((err)=> {
        console.log(err);
    })
}