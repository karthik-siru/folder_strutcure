const httpStatus = require('http-status');

/**
 * This file contain Success and Error response for sending to client / user
 * @author 
 * @copyright 
 * @since 2022
 */
class ApiResponse  {
  /**
   * This class gives some basic responses
   *
   * @param {number} statusCode
   * @param {string} message
   * @param {object | array} results
   * @param {object | array} errors
   */
  constructor({ statusCode = 422, message = '', results = {}, errors = {} }) {
    this.statusCode = statusCode;
    this.message = message;
    this.results = results;
    this.errors = errors;
  }

  /**
   * Send any success response
   */
  get success() {
    return {
      messge: this.message,
      error: false,
      code: this.statusCode,
      results: this.results,
    };
  }

  /**
   * Send any error response
   */
  get error() {
    return {
      messge: this.message,
      error: true,
      code: this.statusCode,
    };
  }

  /**
   * Send any validation response
   */
  get validation() {
    return {
      message: 'Validation errors',
      error: true,
      code: 422,
      errors,
    };
  }
}

module.exports = ApiResponse;
