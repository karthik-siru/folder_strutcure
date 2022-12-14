const  httpStatus = require( 'http-status');
const  ApiError = require( '../utils/ApiError');
const db = require("../../../db")
/**
 * Login with username and password
 * @returns {Promise<Mess Info>}
 */
getMessDetails = () => {
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM mess`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

module.exports={
  getMessDetails
}
