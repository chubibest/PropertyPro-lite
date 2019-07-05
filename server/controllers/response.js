const successResponse = (res, data, statusCode) => {
  const status = statusCode || 200;
  res.status(status).send({
    status: 'success',
    statusCode: status,
    data
  });
};

const errorResponse = (res, errorMessage, statuscode) => {
  const status = statuscode || 404;
  const error = errorMessage || 'Not Found';
  res.status(status).send({
    status: 'error',
    statusCode: status,
    error
  });
};
export { successResponse, errorResponse };
