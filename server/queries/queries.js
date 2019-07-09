/* eslint-disable camelcase */
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


export const createAdQuery = ({
  id, owner, price, city, state, address, type, image_url
}) => ({
  text: `INSERT INTO property
  (id, owner, price, city, state, address, type, image_url)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
  values: [id, owner, price, city, state, address, type, image_url]
});

export const getStatus = (owner, id) => ({
  text: 'SELECT status FROM property  WHERE id = $1 and  owner = $2',
  values: [id, owner]
});
export const changeStatusQuery = (status, Id) => ({
  text: 'UPDATE property SET status = $1 WHERE id = $2  RETURNING *',
  values: [status, Id]
});

export const removeItemQuery = (Id, owner) => ({
  text: 'DELETE FROM property WHERE Id = $1 and owner = $2 returning * ',
  values: [Id, owner]
});

export const getAllMyAds = owner => ({
  text: 'SELECT * FROM property WHERE owner = $1',
  values: [owner]
});

export const getAllQuery = () => ({
  text: 'SELECT * FROM property'
});

// export const getItemQuery = (item, userId) => ({
//   text: 'SELECT * FROM todoes WHERE item = $1 and owner_id = $2',
//   values: [item, userId]
// });


// // changes here
// export const statusQuery = (item, userId, limit, offset) => ({
//   text: 'SELECT * FROM todoes WHERE completed = $1 and owner_id = $2 limit $3 offset $4',
//   values: [item, userId, limit, offset]
// });

//
// // export const getUserByIdQuery = id => ({
// //   text: 'SELECT * FROM users WHERE id = $1',
// //   values: [id]
// // });
// export const removeUserQuery = id => ({
//   text: 'DELETE FROM users WHERE id = $1 returning * ',
//   values: [id]
// });
