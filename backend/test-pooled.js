const { PrismaClient } = require('@prisma/client');

async function testPooledConnection() {
  // Test pooled connection
  const pooledUrl = "postgresql://postgres.jvrceinkmviyjknjdyhw:himanshu07p@aws-0-ap-south-1.pooler.supabase.com:6543/postgres";
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: pooledUrl
      }
    }
  });
  
  try {
    console.log('🔍 Testing pooled connection...');
    await prisma.$connect();
    console.log('✅ Pooled connection successful!');
    
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Pooled query successful:', result);
    
  } catch (error) {
    console.error('❌ Pooled connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testPooledConnection();
