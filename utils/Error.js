class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.status = statusCode;
  }
}

export default CustomError;
