import { findUserByName } from "../utils/getUsers.js";
import { encryption } from "../utils/cryption.js";
import { postUser } from "../utils/postUser.js";

async function register(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required",
        code: "2"
      });
    }

    const existingUser = await findUserByName(username)
    if (existingUser) {
      return res.status(409).json({
        message: "username already exists",
        code: "1",
        username
      })
    }

    const encryptionPassword = await encryption(password)
    await postUser({ username, password: encryptionPassword })

    res.status(201).json({
      message: "user created",
      code: "0",
      username
    })

  } catch (error) {
    console.error('注册失败：', error)
    return res.status(500).json({
      message: "internal server error",
      code: "3"
    })
  }
}

export { register }