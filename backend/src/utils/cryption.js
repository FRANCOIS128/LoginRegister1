import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";

async function encryption(password) {
  try {
    // 从数据库获取 saltRounds
    const bcryptConfig = await prisma.bcrypt.findUnique({
      where: {
        id: "1"
      }
    });

    const saltRounds = bcryptConfig?.saltRounds || 10;
    // 使用 bcrypt 进行加密
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log("密码加密失败: ", error);
    throw new Error(`密码加密失败: ${error}`);
  }
}

export {
  encryption
}