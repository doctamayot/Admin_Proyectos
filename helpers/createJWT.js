import jwt from "jsonwebtoken";

export const createJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default createJWT;
