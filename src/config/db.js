
const { PrismaClient } = require('@prisma/client');
const env = require('./env');

let prisma;

const createPrismaClient = () => {
  return new PrismaClient();
};

if (env.isProduction) {
  prisma = createPrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = createPrismaClient();
  }
  prisma = global.prisma;
}

const connect = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

const disconnect = async () => {
  try {
    await prisma.$disconnect();
    console.log('Database disconnected');
  } catch (error) {
    console.error('Error disconnecting:', error.message);
  }
};

module.exports = { prisma, connect, disconnect };
