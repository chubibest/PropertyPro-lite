import FlakeId from 'flake-idgen';
import intformat from 'biguint-format';

const genId = new FlakeId();
/**
 * class Flags
 */
class Flags {
  /**
 * class constructor
 */
  constructor() {
    this.flags = [];
  }

  /**
   * @param {object} data
   * @return {object} flag
   * */
  createFlag(data) {
    const flag = {
      id: (intformat(genId.next(), 'dec')),
      property_id: data.property_id,
      created_on: new Date().getTime,
      reason: data.reason,
      description: data.description
    };
    this.flags.push(flag);
    return flag;
  }
}

export default new Flags();
