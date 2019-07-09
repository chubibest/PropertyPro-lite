import FlakeId from 'flake-idgen';
import intformat from 'biguint-format';
import {
  createAdQuery, changeStatusQuery, getStatus, removeItemQuery, getAd
} from '../queries/queries';
import query from '../configurations/dbconfig';


const genId = new FlakeId();

// eslint-disable-next-line import/prefer-default-export
export const createAd = async (body) => {
  body.id = intformat(genId.next(), 'dec');
  const [result] = await query(createAdQuery(body));
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
