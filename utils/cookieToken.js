const jwtToken = require("jsonwebtoken");
const cookieToken = function (user, res, renderSite) {
  const token = jwtToken.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  console.log("JWT TOKEN:", token);
  const options = {
    expire: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(200).cookie("token", token, options).render(renderSite);
};
module.exports = cookieToken;
