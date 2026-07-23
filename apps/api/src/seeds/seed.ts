import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'gos_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();
  console.log('🌱 Seeding database...');

  const userRepo = dataSource.getRepository('users');

  // Create admin user
  const adminExists = await userRepo.findOne({
    where: { email: process.env.ADMIN_EMAIL || 'admin@gosgrocery.com' },
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || 'Admin@123!',
      12,
    );
    await userRepo.save({
      name: 'GOS Admin',
      email: process.env.ADMIN_EMAIL || 'admin@gosgrocery.com',
      phone: '9000000000',
      password: hashedPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
      isEmailVerified: true,
      isPhoneVerified: true,
    });
    console.log('✅ Admin user created');
  } else {
    console.log('ℹ️  Admin user already exists');
  }

  // Seed sample categories
  const categoryRepo = dataSource.getRepository('categories');
  const categories = [
    { name: 'Fruits & Vegetables', slug: 'fruits-vegetables', description: 'Fresh daily produce', sortOrder: 1 },
    { name: 'Dairy & Eggs', slug: 'dairy-eggs', description: 'Fresh dairy products', sortOrder: 2 },
    { name: 'Meat & Seafood', slug: 'meat-seafood', description: 'Fresh meats and seafood', sortOrder: 3 },
    { name: 'Beverages', slug: 'beverages', description: 'Drinks and juices', sortOrder: 4 },
    { name: 'Bakery', slug: 'bakery', description: 'Bread and baked goods', sortOrder: 5 },
    { name: 'Snacks', slug: 'snacks', description: 'Chips, nuts and snacks', sortOrder: 6 },
    { name: 'Personal Care', slug: 'personal-care', description: 'Hygiene and wellness', sortOrder: 7 },
    { name: 'Cleaning', slug: 'cleaning', description: 'Cleaning supplies', sortOrder: 8 },
  ];

  for (const cat of categories) {
    const exists = await categoryRepo.findOne({ where: { slug: cat.slug } });
    if (!exists) {
      await categoryRepo.save(cat);
    }
  }
  console.log('✅ Sample categories created');

  await dataSource.destroy();
  console.log('🎉 Seeding complete!');
}

seed().catch((e) => {
  console.error('❌ Seed failed:', e);
  process.exit(1);
});
