type DecodedToken = {
  exp: number; // access token expiry
  firstName: string;
  iat: number; // sth
  iss: string; // token type
  lastName: string;
  scope: string; // role
  sub: string; //email
};

export type { DecodedToken };
