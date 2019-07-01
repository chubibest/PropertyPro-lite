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
   * @returns {object} property ad
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
    return this.fetchProperty(property.id);
  }

  /**
   * @param {integer} propId
   * @returns {object} property ad
   */
  fetchProperty(propId) {
    const property = this.Property.find(prop => propId === prop.id);
    if (!property) {
      return property;
    }
    const {
      owner,
      ...responseObject
    } = property;
    return responseObject;
  }

  /**
   *
   * @param {object} update
   * @param {integer} propertyId
   * @returns {object} property ad
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
    const adUpdate = Object.assign(propertyAd, update, { id: propertyAd.id });
    this.Property.splice(index, 1, adUpdate);
    return this.fetchProperty(propertyId);
  }

  /**
   * @param {integer} ownerid
   * @param {integer} propertyId
   * @returns {object} property ad
   */
  changeStatus(ownerid, propertyId) {
    const propertyAd = this.Property.find(
      property => ownerid === property.owner && propertyId === property.id
    );
    if (!propertyAd) {
      return propertyAd;
    }
    propertyAd.status = 'Sold';
    return this.fetchProperty(propertyId);
  }

  /**
   * @param {Integer} ownerId
   * @param {Integer} propertyId
   * @returns {Sting}
   */
  deleteAd(ownerId, propertyId) {
    let index;
    const propertyAd = this.Property.find((prop, ind) => {
      index = ind;
      return ownerId === prop.owner && propertyId === prop.id;
    });
    if (!propertyAd) {
      return propertyAd;
    }
    this.Property.splice(index, 1);
    return 'Deleted';
  }

  /**
   * @returns propertyArray
   */
  getAllAds() {
    return this.Property;
  }

  /**
   * @param {String} type
   * @returns result
   */
  getAdBytype(type) {
    const result = this.Property.filter(property => property.type === type);
    return result;
  }
}

export default new Property();
