
export default (relation, data) => {
  let fields;
  let values;
  if (relation === 'users') {
    fields = 'id, email, first_name, last_name, password, phone_number, address';
    const {
      id,
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      phone_number: phoneNumber,
      address
    } = data;
    values = [id, email, firstName, lastName, password, phoneNumber, address];
    return {
      text: `INSERT INTO  ${relation}
    (${fields})
    values($1, $2, $3, $4, $5, $6, $7) returning *`,
      values
    };
  }
  fields = 'id, owner, price, city, state, address, type, image_url';
  const {
    id, owner, price, city, state, address, type, image_url: imageUrl
  } = data;
  values = [id, owner, price, city, state, address, type, imageUrl];
  return {
    text: `INSERT INTO  ${relation}
    (${fields})
    values($1, $2, $3, $4, $5, $6, $7, $8) returning *`,
    values
  };
};
