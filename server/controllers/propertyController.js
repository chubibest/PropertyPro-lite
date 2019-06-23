import property from '../models/Property';

const createAd = (req, res) => {
  const propertyAd = property.createAd(req.body);
  res.status(200).send({
    status: 'success',
    data: propertyAd
  });
};

const updateAd = (req, res) => {
  const updatedAd = property.updateAd(req.body, req.params.property_id);
  if (!updatedAd) {
    return res.status(403).send({
      status: 'error',
      error: 'Unauthorised'
    });
  }
  res.status(200).send({
    status: 'success',
    data: updatedAd
  });
};

const changeStatus = (req, res) => {
  const soldAd = property.changeStatus(req.body.id, req.params.property_id);
  if (!soldAd) {
    return res.status(403).send({
      status: 'error',
      error: 'Unauthorised'
    });
  }
  res.status(200).send({
    status: 'success',
    data: soldAd
  });
};

const deleteAd = (req, res) => {
  const adStatus = property.deleteAd(req.body.id, req.params.property_id);
  if (!adStatus) {
    return res.status(403).send({
      status: 'error',
      error: 'Unauthorised'
    });
  }
  res.status(200).send({
    status: 'success',
    data: {
      message: adStatus
    }
  });
};

export {
  createAd, updateAd, changeStatus, deleteAd
};
