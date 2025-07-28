import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const testConnection = async () => {
  try {
    // 测试数据库连接
    await prisma.$connect()
    console.log('✅ 数据库连接成功！')

    // 获取所有可用的模型
    const models = Object.keys(prisma)
      .filter(key => !key.startsWith('$') && !key.startsWith('_'))

    console.log('\n可用的数据模型：')
    for (const model of models) {
      try {
        const count = await prisma[model].count()
        console.log(`📊 ${model}: ${count} 条记录`)
      } catch (err) {
        console.log(`❌ ${model}: 无法获取记录数`)
      }
    }

  } catch (error) {
    console.error('❌ 数据库连接失败：', error)
  } finally {
    await prisma.$disconnect()
    console.log('\n数据库连接已关闭')
  }
}

testConnection()