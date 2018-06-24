export const doLogin = user => ({
  type: 'LOGGED_IN',
  payload: user.user
});

export const doAuth = () => ({
  type: 'AUTHENTICATED'
});
