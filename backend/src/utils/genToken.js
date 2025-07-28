import jwt from "jsonwebtoken";
import "dotenv/config";

function genToken(info, expireTime = "1h") {
  const newInfo = { ...info, date: new Date() }
  const token = jwt.sign(newInfo, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: expireTime
  })
  return token
}

export {
  genToken
}