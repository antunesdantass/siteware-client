import axios from 'axios';
const _ = require('lodash');

const RESOURCES = {
  CART: "/cart",
  PRODUCT: "/product",
  DISCOUNT: "/discount"
}

const removeEmptyProps = object => _.omitBy(object, field => _.isUndefined(field) || (_.isString(field) && _.isEmpty(field)))

const LOCAL_BASE_URL = "https://esiteware.herokuapp.com";

const API = axios.create({
  baseURL: LOCAL_BASE_URL
})

export { API, RESOURCES, removeEmptyProps };