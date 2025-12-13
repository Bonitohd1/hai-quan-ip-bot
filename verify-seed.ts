import prisma from './lib/prisma';

async function main() {
  const count = await prisma.document.count();
  const documents = await prisma.document.findMany({ take: 3 });
  
  console.log(`Total documents: ${count}`);
  console.log('\nFirst 3 documents:');
  documents.forEach(doc => {
    console.log(`- ${doc.code}: ${doc.name}`);
  });
}

main()
  .catch(e => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
