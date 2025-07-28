import jwt from "jsonwebtoken"
import "dotenv/config"

function authToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      console.log("没有token，可能是首次登录，直接继续");
      return next()
    }

    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({
            message: "Token has expired",
            code: 6
          })
        }
        return res.status(403).json({
          message: "Invalid token",
          code: 2
        })
      }
      req.body.username = decoded.username
      req.body.password = decoded.password
      next()
    })
  } catch (error) {
    console.error('Token验证失败：', error)
    return res.status(500).json({
      message: "Token verification failed",
      code: 3
    })
  }
}

export { authToken }

