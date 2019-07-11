export default (relation, fields, values) => ({
  text: `INSERT INTO  ${relation}
  (${fields})
  values($1, $2, $3, $4, $5, $6, $7, $8) returning *`,
  values: [...values]
});
