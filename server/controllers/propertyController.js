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

const myAd = ({ owner, ...rest }) => (rest);

const createAds = async ({ body }, res) => {
  try {
    body.id = intformat(genId.next(), 'dec');
    const [propertyAd] = await query(insertQuery('property', body));
    successResponse(res, myAd(propertyAd));
  } catch (e) {
    errorResponse(res, e, 500);
  }
};

const updateAd = async ({ body, params: { property_id: propId } }, res) => {
  try {
    const [updatedAd] = await query(updateAdQuery(body, body.owner, propId));
    if (!updatedAd) {
      return errorResponse(res);
    }
    successResponse(res, myAd(updatedAd));
  } catch (e) {
    errorResponse(res, e, 500);
  }
};

const changeStatus = async ({ body: { owner }, params: { property_id: propId } }, res) => {
  try {
    const [soldAd] = await query(getStatus(owner, propId));
    if (!soldAd) {
      return errorResponse(res);
    }
    let { status } = soldAd;
    status = status === 'Sold' ? 'Available' : 'Sold';
    const [result] = await query(changeStatusQuery(status, propId));
    successResponse(res, myAd(result));
  } catch (e) {
    errorResponse(res, e, 500);
  }
};

const deletePropertyAd = async ({ body: { owner }, params: { property_id: propId } }, res) => {
  try {
    const [adStatus] = await query(removeItemQuery(owner, propId));
    if (!adStatus) {
      return errorResponse(res);
    }
    res.status(204).send();
  } catch (e) {
    errorResponse(res, e, 500);
  }
};


const getAdById = async ({ params: { property_id: propId } }, res) => {
  try {
    const [propertyAd] = await query(getAd(propId));
    if (!propertyAd) {
      return errorResponse(res);
    }
    successResponse(res, myAd(propertyAd));
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
    const response = result.map(ad => myAd(ad));
    successResponse(res, response);
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
    const response = result.map(ad => myAd(ad));
    return successResponse(res, response);
  } catch (e) {
    errorResponse(res, e, 500);
  }
};

const flag = async ({ params, body }, res) => {
  const { property_id: propId } = params;
  body.property_id = propId;
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
