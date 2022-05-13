const BadRequest = require("./BadRequest");
const CustomError = require("./CustomError");
const Forbidden = require("./Forbidden");
const NotFound = require("./NotFound");
const Unauthenticated = require("./Unauthenticated");

module.exports = {
  Unauthenticated,
  CustomError,
  BadRequest,
  Forbidden,
  NotFound,
};
