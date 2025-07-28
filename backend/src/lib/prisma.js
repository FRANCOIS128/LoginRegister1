import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
  errorFormat: 'pretty'
})

prisma.$on('error', (e) => {
  console.error('Prisma Error:', e)
})

export default prisma