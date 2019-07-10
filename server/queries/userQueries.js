export const createUserQuery = ({
  id, email, firstname, lastname, username, password, phonenumber, address
}) => ({
  text: `INSERT INTO  users
  (id, email, first_name, last_name, username,password, phonenumber, address)
  values($1, $2, $3, $4, $5, $6, $7, $8) returning *`,
  values: [id, email, firstname, lastname, username, password, phonenumber, address]
});

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
