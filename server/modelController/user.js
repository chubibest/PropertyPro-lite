/* eslint-disable camelcase */
import FlakeId from 'flake-idgen';
import intformat from 'biguint-format';
import { getUserQuery, createUserQuery } from '../queries/queries';
import query from '../configurations/dbconfig';


const genId = new FlakeId();

export const fetchUser = async (userName) => {
  const [user] = await query(getUserQuery(userName));
  if (user) {
    const {
      username, phonenumber, address, is_admin, ...rest
    } = user;
    return rest;
  }
};

export const createUser = async (body) => {
  body.id = intformat(genId.next(), 'dec');
  const [user] = await query(createUserQuery(body));
  if (user) {
    const {
      username, password, phonenumber, address, is_admin, ...rest
    } = user;
    return rest;
  }
};
