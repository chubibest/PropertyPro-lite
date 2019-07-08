import FlakeId from 'flake-idgen';
import intformat from 'biguint-format';
import { createAdQuery } from '../queries/queries';
import query from '../configurations/dbconfig';


const genId = new FlakeId();

// eslint-disable-next-line import/prefer-default-export
export const createAd = async (body) => {
  body.id = intformat(genId.next(), 'dec');
  const [result] = await query(createAdQuery(body));
  return result;
};
