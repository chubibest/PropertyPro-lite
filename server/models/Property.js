/* eslint-disable camelcase */
import FlakeId from 'flake-idgen';
import intformat from 'biguint-format';

const genId = new FlakeId();
/**
 * class Property
 */
class Property {
  /**
   * class constructor
   */
  constructor() {
    this.Property = [];
  }

  /**
   *
   * @param {object} data
   * @returns {object} property
   */
  createAd(data) {
    const property = {
      id: (intformat(genId.next(), 'dec')),
      owner: data.id,
      status: 'Available',
      price: data.price,
      state: data.state,
      city: data.city,
      address: data.address,
      type: data.type,
      created_on: new Date().getTime(),
      image_url: String
    };
    this.Property.push(property);
    console.log('THIS IS THE PROPERTY ARRAY', this.Property);
    return this.fetchProperty(property.id);
  }

  /**
   * @param {integer} propId
   * @returns {object} data
   */
  fetchProperty(propId) {
    const property = this.Property.find(prop => propId === prop.id);
    if (!property) {
      return property;
    }
    const {
      id,
      status,
      type,
      state,
      city,
      address,
      price,
      created_on,
      image_url
    } = property;
    return {
      id,
      status,
      type,
      state,
      city,
      address,
      price,
      created_on,
      image_url
    };
  }

  /**
   *
   * @param {integer} ownerId
   * @param {integer} propertyId
   *  @returns {object}
   */
  updateAd(update, propertyId) {
    let index;
    const propertyAd = this.Property.find((prop, ind) => {
      index = ind;
      return update.id === prop.owner && propertyId === prop.id;
    });
    if (!propertyAd) {
      return propertyAd;
    }
    console.log(index);
    const adUpdate = Object.assign(propertyAd, update, { id: propertyAd.id });
    this.Property.splice(index, 1, adUpdate);
    console.log(adUpdate);
    console.log('UPDATED PROPERTY ARRAY', this.Property.length);
    return adUpdate;
  }
}

export default new Property();
