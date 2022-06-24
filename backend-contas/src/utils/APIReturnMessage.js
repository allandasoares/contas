module.exports = function APIReturnMessage({ code, success, message, data }) {
  return {
    code,
    success,
    message,
    data,
  };
};
