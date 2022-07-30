const localStg = {
  set: {
    token: (token) => localStorage.setItem('token', JSON.stringify(token)),
    user: (user) => localStorage.setItem('user', JSON.stringify(user)),

  },

  get: {
    token: () => JSON.parse(localStorage.getItem('token')),
    user: () => JSON.parse(localStorage.getItem('user')),
  },

  remove: {
    token: () => localStorage.removeItem('token'),
  }
}

export default localStg;
