import property from '../models/Property';
import { successResponse, errorResponse } from './response';


const createAd = (req, res) => {
  const propertyAd = property.createAd(req.body);
  successResponse(res, propertyAd);
};

const updateAd = (req, res) => {
  const updatedAd = property.updateAd(req.body, req.params.property_id);
  if (!updatedAd) {
    return errorResponse(res);
  }
  successResponse(res, updatedAd);
};

const changeStatus = (req, res) => {
  const soldAd = property.changeStatus(req.body.id, req.params.property_id);
  if (!soldAd) {
    return errorResponse(res);
  }
  successResponse(res, soldAd);
};

const deleteAd = (req, res) => {
  const adStatus = property.deleteAd(req.body.id, req.params.property_id);
  if (!adStatus) {
    return errorResponse(res);
  }
  successResponse(res, adStatus);
};

const getAllAds = (req, res) => {
  const result = property.getAllAds();
  if (!result.length) {
    return successResponse(res, 'No ads at this time');
  }
  successResponse(res, result);
};

const getAdById = (req, res) => {
  const propertyAd = property.fetchProperty(req.params.property_id);
  if (!propertyAd) {
    return errorResponse(res);
  }
  successResponse(res, propertyAd);
};

const getByType = (req, res, next) => {
  if (!req.query.type) {
    return next();
  }
  const result = property.getAdBytype(req.query.type);
  if (!result.length) {
    return successResponse(res, `${req.query.type} unavailable at the moment`);
  }
  return successResponse(res, result);
};
export {
  createAd, updateAd, changeStatus, deleteAd, getAllAds, getAdById, getByType
};
