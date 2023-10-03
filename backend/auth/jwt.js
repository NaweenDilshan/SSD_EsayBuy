var jwt = require("jsonwebtoken");

class JWT {
  constructor(Token_key) {
    this._Token_key = Token_key;
  }

  generateToken(email) {
    return jwt.sign({ email: email }, this._Token_key, {
      expiresIn: "1d",
      algorithm: "HS256",
      
    });
  }
  decodeToken(token) {
    return jwt.verify(token, this._Token_key);
  }
}

module.exports = JWT;
