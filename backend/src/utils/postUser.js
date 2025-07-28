import prisma from '../lib/prisma.js'

async function postUser(user) {
  try {
    const newUser = await prisma.user.create({
      data: {
        username: user.username,
        password: user.password,
      }
    })
    return newUser
  } catch (error) {
    console.log("postUser error: ", error)
    throw error
  }
}

export {
  postUser
}