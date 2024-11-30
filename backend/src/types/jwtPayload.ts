/**
 * Represents the payload of a JSON Web Token (JWT).
 */
export interface JwtPayload {
  /**
   * The unique identifier for the user.
   */
  _id: string;

  /**
   * The email address of the user.
   */
  email: string;
}