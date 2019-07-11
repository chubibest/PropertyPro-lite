/* eslint-disable camelcase */
export default (relation, data) => {
  let fields;
  let values;
  if (relation === 'users') {
    fields = 'id, email, first_name, last_name, username, password, phonenumber, address';
    const {
      id, email, firstname, lastname, username, password, phonenumber, address
    } = data;
    values = [id, email, firstname, lastname, username, password, phonenumber, address];
  } else {
    fields = 'id, owner, price, city, state, address, type, image_url';
    const {
      id, owner, price, city, state, address, type, image_url
    } = data;
    values = [id, owner, price, city, state, address, type, image_url];
  }
  return {
    text: `INSERT INTO  ${relation}
  (${fields})
  values($1, $2, $3, $4, $5, $6, $7, $8) returning *`,
    values
  };
};
