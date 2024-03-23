class ApiError {
  constructor(errorMsg = 'Something went wrong!', errorCode = 400) {
    this.isError = true;
    this.errorCode = errorCode;
    this.errorMsg = errorMsg;
  }
}

export default ApiError;
