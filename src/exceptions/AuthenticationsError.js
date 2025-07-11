import ClientError from "./ClientError.js";

export default class AuthenticationsError extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}