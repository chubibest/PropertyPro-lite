import property from '../models/Property';

const createAd = (req, res) => {
  const propertyAd = property.createAd(req.body);
  res.status(200).send({
    status: 'success',
    data: propertyAd
  });
};

const updateAd = (req, res) => {
  console.log('REQ BODY', req.body);
  const updatedAd = property.fetchPropertyForUpdate(req.body, req.params.property_id);
  if (!updatedAd) {
    return res.status(403).send({
      status: 'error',
      error: 'Unauthorised'
    });
  }
  console.log('ROM CONTROLLER', updatedAd);
  res.status(200).send({
    status: 'success',
    data: updatedAd
  });
};

export { createAd, updateAd };
