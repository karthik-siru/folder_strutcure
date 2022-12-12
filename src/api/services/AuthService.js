const  { student } = require( '../models');
const  httpStatus = require( 'http-status');
const  { authService } = require( '../services');
const  ApiError = require( '../utils/ApiError');
const  { tokenTypes } = require( '../../config/tokens');

/**
 * Login with username and password
 * @param {string} is
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (id, password) => {

};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
 const logout = async (refreshToken) => {
  
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {

};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  
};

module.exports={
  loginUserWithEmailAndPassword,
  refreshAuth,
  resetPassword
}
