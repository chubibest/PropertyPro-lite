/* eslint-disable camelcase */
import FlakeId from 'flake-idgen';
import intformat from 'biguint-format';
import {
  changeStatusQuery, getStatus, removeItemQuery, getAd, getAllQuery, getAdsByType,
  updateAdQuery, flagQuery
} from '../queries/propertyQueries';
import insertQuery from '../queries/commonInsert';
import query from '../configurations/dbconfig';
import { successResponse, errorResponse } from './response';


const genId = new FlakeId();

const createAds = async ({ body }, res) => {
  try {
    body.id = intformat(genId.next(), 'dec');
    const [propertyAd] = await query(insertQuery('property', body));
    successResponse(res, propertyAd);
  } catch (e) {
    errorResponse(res, e, 500);
  }
};

const updateAd = async ({ body, params: { property_id } }, res) => {
  try {
    const [updatedAd] = await query(updateAdQuery(body, body.owner, property_id));
    if (!updatedAd) {
      return errorResponse(res);
    }
    successResponse(res, updatedAd);
  } catch (e) {
    errorResponse(res, e, 500);
  }
};

const changeStatus = async ({ body: { owner }, params: { property_id } }, res) => {
  try {
    const [soldAd] = await query(getStatus(owner, property_id));
    if (!soldAd) {
      return errorResponse(res);
    }
    let { status } = soldAd;
    status = status === 'Sold' ? 'Available' : 'Sold';
    const [result] = await query(changeStatusQuery(status, property_id));
    successResponse(res, result);
  } catch (e) {
    errorResponse(res, e, 500);
  }
};

const deletePropertyAd = async ({ body: { owner }, params: { property_id } }, res) => {
  try {
    const [adStatus] = await query(removeItemQuery(owner, property_id));
    if (!adStatus) {
      return errorResponse(res);
    }
    successResponse(res, adStatus, 204);
  } catch (e) {
    errorResponse(res, e, 500);
  }
};


const getAdById = async ({ params: { property_id } }, res) => {
  try {
    const [propertyAd] = await query(getAd(property_id));
    if (!propertyAd) {
      return errorResponse(res);
    }
    successResponse(res, propertyAd);
  } catch (e) {
    errorResponse(res, e, 500);
  }
};

const getAllAds = async (req, res) => {
  try {
    const result = await query(getAllQuery());
    if (!result.length) {
      return successResponse(res, 'No ads at this time');
    }
    successResponse(res, result);
  } catch (e) {
    errorResponse(res, e, 500);
  }
};

const getByType = async ({ query: { type } }, res, next) => {
  if (!type) {
    return next();
  }
  try {
    const result = await query(getAdsByType(type));
    if (!result.length) {
      return successResponse(res, `${type} unavailable at the moment`);
    }
    return successResponse(res, result);
  } catch (e) {
    errorResponse(res, e, 500);
  }
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
