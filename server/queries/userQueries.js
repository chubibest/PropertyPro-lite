export const getUserQuery = email => ({
  text: 'SELECT * FROM users WHERE email = $1',
  values: [email]
});

export const changePassQuery = (pass, email) => ({
  text: 'UPDATE users SET password = $1 WHERE email = $2  RETURNING *',
  values: [pass, email]
});
