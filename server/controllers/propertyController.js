/* eslint-disable camelcase */
import FlakeId from 'flake-idgen';
import intformat from 'biguint-format';
import {
  createAdQuery, changeStatusQuery, getStatus, removeItemQuery, getAd, getAllQuery, getAdsByType,
  updateAdQuery, flagQuery
} from '../queries/propertyQueries';
import query from '../configurations/dbconfig';
import { successResponse, errorResponse } from './response';


const genId = new FlakeId();

const createAds = async ({ body }, res) => {
  try {
    body.id = intformat(genId.next(), 'dec');
    const [propertyAd] = await query(createAdQuery(body));
    successResponse(res, propertyAd);
  } catch (e) {
    errorResponse(res, e, 500);
  }
};

const updateAd = async ({ body, params: { property_id } }, res) => {
  const [updatedAd] = await query(updateAdQuery(body, body.owner, property_id));
  if (!updatedAd) {
    return errorResponse(res);
  }
  successResponse(res, updatedAd);
};

const changeStatus = async ({ body: { owner }, params: { property_id } }, res) => {
  const [soldAd] = await query(getStatus(owner, property_id));
  if (!soldAd) {
    return errorResponse(res);
  }
  let { status } = soldAd;
  status = status === 'Sold' ? 'Available' : 'Sold';
  const [result] = await query(changeStatusQuery(status, property_id));
  successResponse(res, result);
};

const deletePropertyAd = async ({ body: { owner }, params: { property_id } }, res) => {
  const [adStatus] = await query(removeItemQuery(owner, property_id));
  if (!adStatus) {
    return errorResponse(res);
  }
  successResponse(res, adStatus, 204);
};


const getAdById = async ({ params: { property_id } }, res) => {
  const [propertyAd] = await query(getAd(property_id));
  if (!propertyAd) {
    return errorResponse(res);
  }
  successResponse(res, propertyAd);
};

const getAllAds = async (req, res) => {
  const result = await query(getAllQuery());
  if (!result.length) {
    return successResponse(res, 'No ads at this time');
  }
  successResponse(res, result);
};

const getByType = async ({ query: { type } }, res, next) => {
  if (!type) {
    return next();
  }
  const result = await query(getAdsByType(type));
  if (!result.length) {
    return successResponse(res, `${type} unavailable at the moment`);
  }
  return successResponse(res, result);
};

const flag = async ({ params, body }, res) => {
  const { property_id } = params;
  body.property_id = property_id;
  body.id = intformat(genId.next(), 'dec');
  try {
    await query(flagQuery(body));
    res.status(204).send({
      status: 204
    });
  } catch (e) {
    errorResponse(res, e, 500);
  }
};

export {
  createAds, updateAd, changeStatus, deletePropertyAd, getAllAds, getAdById, getByType, flag
};
