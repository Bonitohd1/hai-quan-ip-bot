import prisma from '../lib/prisma';
import { logger } from '../lib/logger';
import fs from 'fs';
import path from 'path';

async function main() {
  try {
    logger.info('🌱 Starting seed...');

    // Seed admin user
    const adminExists = await prisma.adminUser.findUnique({
      where: { username: 'admin' },
    });

    if (!adminExists) {
      await prisma.adminUser.create({
        data: {
          username: 'admin',
          password: 'admin123', // CHANGE THIS IN PRODUCTION!
          email: 'admin@shtt.gov.vn',
          isActive: true,
        },
      });
      logger.info('✅ Admin user created (username: admin, password: admin123)');
    } else {
      logger.info('⊝ Admin user already exists');
    }

    // Read documents.json
    const documentsPath = path.join(process.cwd(), 'lib', 'documents.json');
    const rawData = fs.readFileSync(documentsPath, 'utf-8');
    const data = JSON.parse(rawData);
    const documents = data.documents || [];

    logger.info(`Found ${documents.length} documents to seed`);

    // Seed documents
    let seededCount = 0;
    for (const doc of documents) {
      try {
        const existing = await prisma.document.findUnique({
          where: { code: doc.code },
        });

        if (!existing) {
          await prisma.document.create({
            data: {
              code: doc.code,
              date: doc.date,
              name: doc.name,
              filename: doc.filename,
              type: doc.type,
              description: doc.description || '',
            },
          });
          seededCount++;
          logger.debug(`✓ Seeded: ${doc.code} - ${doc.name}`);
        } else {
          logger.debug(`⊝ Skipped (exists): ${doc.code}`);
        }
      } catch (error) {
        logger.error(`✗ Error seeding ${doc.code}`, error as Error);
      }
    }

    logger.info(`✅ Seed completed! ${seededCount} documents seeded`);

  } catch (error) {
    logger.error('🌱 Seed failed', error as Error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
