import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Seeding Supabase database...');

  // Clear existing data (optional - remove in production)
  await prisma.url.deleteMany();
  console.log('🧹 Cleared existing URLs');

  // Create some sample URLs
  const sampleUrls = [
    {
      originalUrl: 'https://github.com',
      shortCode: 'github',
      clicks: 42
    },
    {
      originalUrl: 'https://stackoverflow.com',
      shortCode: 'stack',
      clicks: 24
    },
    {
      originalUrl: 'https://supabase.com',
      shortCode: 'supabase',
      clicks: 18
    },
    {
      originalUrl: 'https://tailwindcss.com',
      shortCode: 'tailwind',
      clicks: 15
    },
    {
      originalUrl: 'https://nextjs.org',
      shortCode: 'nextjs',
      clicks: 33
    }
  ];

  for (const url of sampleUrls) {
    await prisma.url.upsert({
      where: { shortCode: url.shortCode },
      update: {},
      create: url
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log(`📊 Created ${sampleUrls.length} sample URLs`);
  
  // Display sample URLs
  console.log('\n🔗 Sample URLs created:');
  for (const url of sampleUrls) {
    console.log(`   ${url.shortCode} → ${url.originalUrl}`);
  }
}

seed()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
