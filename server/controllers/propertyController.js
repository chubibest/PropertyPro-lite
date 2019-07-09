import property from '../models/Property';
import {
  createAd, updateStatus, deleteAd, fetchAd
} from '../modelController/property';
import { successResponse, errorResponse } from './response';


const createAds = async (req, res) => {
  try {
    const propertyAd = await createAd(req.body);
    successResponse(res, propertyAd);
  } catch (e) {
    errorResponse(res, e, 500);
  }
};


// fghjk
const updateAd = (req, res) => {
  const updatedAd = property.updateAd(req.body, req.params.property_id);
  if (!updatedAd) {
    return errorResponse(res);
  }
  successResponse(res, updatedAd);
};
// ghjkl

const changeStatus = async (req, res) => {
  const soldAd = await updateStatus(req.body.owner, req.params.property_id);
  if (!soldAd) {
    return errorResponse(res);
  }
  successResponse(res, soldAd);
};

const deletePropertyAd = async (req, res) => {
  const adStatus = await deleteAd(req.body.owner, req.params.property_id);
  if (!adStatus) {
    return errorResponse(res);
  }
  successResponse(res, adStatus, 204);
};

const getAllAds = (req, res) => {
  const result = property.getAllAds();
  if (!result.length) {
    return successResponse(res, 'No ads at this time');
  }
  successResponse(res, result);
};

const getAdById = async (req, res) => {
  const propertyAd = await fetchAd(req.params.property_id);
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
  createAds, updateAd, changeStatus, deletePropertyAd, getAllAds, getAdById, getByType
};
