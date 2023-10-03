const JWT = require("./jwt");
const tokenKey = process.env.TOKEN_KEY;
const jwtAuth = new JWT(tokenKey);

const authentication = (req, res, next) => {
  try {
    let cookies = req.cookies;
      const tokenCookie = cookies.token;
    console.log(req.cookies);
    if (tokenCookie == null) {
      res.status(401).send("Authentication failed. Please login again.");
      return;
    }
    const decoded = jwtAuth.decodeToken(tokenCookie);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const tokenExpiration = decoded.exp;
    if (currentTimestamp > tokenExpiration) {
      res.status(401).send("Your session has expired. Please log in again.");
      return;
    }
    next();
  } catch (e) {
    res.status(401).send("Authentication failed. Please login again.");
  }
};

module.exports = {
  authentication,
};
