import prisma from "../lib/prisma.js";

async function findUserByName(username) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    })
    return user
  } catch (error) {
    console.log("findUserByName error: ", error)
    throw error
  }
}

export {
  findUserByName
}