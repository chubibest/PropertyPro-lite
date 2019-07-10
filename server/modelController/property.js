import FlakeId from 'flake-idgen';
import intformat from 'biguint-format';
import {
  createAdQuery, changeStatusQuery, getStatus, removeItemQuery, getAd, getAllQuery, getAdsByType,
  updateAdQuery
} from '../queries/propertyQueries';
import query from '../configurations/dbconfig';


const genId = new FlakeId();

export const createAd = async (body) => {
  body.id = intformat(genId.next(), 'dec');
  const [result] = await query(createAdQuery(body));
  return result;
};

export const updateAdDetails = async (body, owner, propid) => {
  const [result] = await query(updateAdQuery(body, owner, propid));
  return result;
};
export const updateStatus = async (owner, propid) => {
  const [property] = await query(getStatus(owner, propid));
  if (!property) {
    return property;
  }
  let { status } = property;
  status = status === 'Sold' ? 'Available' : 'Sold';
  const [result] = await query(changeStatusQuery(status, propid));
  return result;
};

export const deleteAd = async (owner, propid) => {
  const [result] = await query(removeItemQuery(owner, propid));
  return result;
};

export const fetchAd = async (id) => {
  const [result] = await query(getAd(id));
  return result;
};

export const fetchAds = () => query(getAllQuery());

export const fetchBytype = type => query(getAdsByType(type));
