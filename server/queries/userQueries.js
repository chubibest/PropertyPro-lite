export const getUserQuery = username => ({
  text: 'SELECT * FROM users WHERE username = $1',
  values: [username]
});

export const changePassQuery = (pass, email) => ({
  text: 'UPDATE users SET password = $1 WHERE email = $2  RETURNING *',
  values: [pass, email]
});

export const getByEmail = email => ({
  text: 'SELECT * FROM users WHERE email = $1',
  values: [email]
});
