export default (data, token) => ({
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
    authorization: `Bearer ${token}`
  },
  body: JSON.stringify(data)
});
