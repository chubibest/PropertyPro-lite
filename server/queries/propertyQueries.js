/* eslint-disable camelcase */
export const createAdQuery = ({
  id, owner, price, city, state, address, type, image_url
}) => ({
  text: `INSERT INTO property
  (id, owner, price, city, state, address, type, image_url)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
  values: [id, owner, price, city, state, address, type, image_url]
});

export const updateAdQuery = ({
  price, city, state, address, type, image_url
}, owner, id) => ({
  text: `UPDATE property SET
  price = $1, city = $2, state = $3, address = $4, type = $5, image_url = $6
  WHERE Id = $7 and owner = $8 returning *`,
  values: [price, city, state, address, type, image_url, id, owner]
});

export const getStatus = (owner, id) => ({
  text: 'SELECT status FROM property  WHERE id = $1 and  owner = $2',
  values: [id, owner]
});
export const changeStatusQuery = (status, Id) => ({
  text: 'UPDATE property SET status = $1 WHERE id = $2  RETURNING *',
  values: [status, Id]
});

export const removeItemQuery = (owner, Id) => ({
  text: 'DELETE FROM property WHERE Id = $1 and owner = $2 returning * ',
  values: [Id, owner]
});

export const getAd = id => ({
  text: 'SELECT * FROM property WHERE id = $1',
  values: [id]
});

export const getAdsByType = type => ({
  text: 'SELECT * FROM property WHERE type = $1',
  values: [type]
});

export const getAllQuery = () => ({
  text: 'SELECT * FROM property'
});

export const flagQuery = ({
  id, property_id, reason, description
}) => ({
  text: `INSERT INTO flags (id, property_id, reason, description)
  values ($1, $2, $3, $4)`,
  values: [id, property_id, reason, description]
});
