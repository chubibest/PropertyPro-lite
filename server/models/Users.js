/* eslint-disable camelcase */

import FlakeId from 'flake-idgen';
import intformat from 'biguint-format';

const genId = new FlakeId();


/**
 * class Users
 */
class Users {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.users = [];
    this.id = 1;
  }

  /**
 *
 * @param {object} data
 * @returns {object} user
 */
  createUser(data) {
    const user = {
      id: (intformat(genId.next(), 'dec')),
      email: data.email,
      first_name: data.firstname,
      last_name: data.lastname,
      password: data.password,
      phoneNumber: data.phonenumber,
      address: data.address,
      is_admin: false,
      username: data.username
    };
    this.users.push(user);
    return this.fetchUser(user.username);
  }

  /**
 * @param { String } username
 * @returns { object } user
 */
  fetchUser(username) {
    const user = this.users.find(item => username === item.username);
    if (user === undefined) {
      return undefined;
    }
    const {
      first_name,
      last_name,
      email,
      id

    } = user;
    return {
      id,
      first_name,
      last_name,
      email
    };
  }

  /**
   *
   * @param {String} username
   * @returns {Sting} password
   */
  fetchPassword(username) {
    const user = this.users.find(item => username === item.username);
    return user.password;
  }
}

export default new Users();
