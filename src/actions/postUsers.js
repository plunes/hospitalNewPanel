import { FETCH_USERS, NEW_USER } from './types';

export const fetchUsers = () => dispatch => {
  fetch('https://plunes.co/v4/user/register')
    .then(res => res.json())
    .then(users =>
      dispatch({
        type: FETCH_USERS,
        payload: users
      })
    );
};

export const createUser = userData => dispatch => {
  fetch('https://plunes.co/v4/user/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(res => res.json())
    .then(user =>
      dispatch({
        type: NEW_USER,
        payload: user
      })
    
    );
};
