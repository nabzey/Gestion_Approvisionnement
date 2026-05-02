const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  // Création d'un utilisateur par défaut
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      nom: 'Admin',
      prenom: 'System',
      email: 'admin@test.com',
      password: hashedPassword
    }
  });

  console.log({ admin });

  // On peut ajouter d'autres données ici si besoin
  
  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
