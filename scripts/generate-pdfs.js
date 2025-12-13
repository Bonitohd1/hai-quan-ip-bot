const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

// Function to remove diacritics from Vietnamese text
function removeDiacritics(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

async function generatePDFs() {
  try {
    // Read documents.json
    const documentsPath = path.join(__dirname, '../lib/documents.json');
    const data = JSON.parse(fs.readFileSync(documentsPath, 'utf-8'));
    const documents = data.documents || [];

    // Ensure public/documents directory exists
    const docsDir = path.join(__dirname, '../public/documents');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }

    console.log(`📄 Generating ${documents.length} PDF files...`);

    for (const doc of documents) {
      const pdfPath = path.join(docsDir, doc.filename);

      // Skip if PDF already exists
      if (fs.existsSync(pdfPath)) {
        console.log(`✓ ${doc.filename} (already exists)`);
        continue;
      }

      // Create PDF
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595, 842]); // A4 size
      const { width, height } = page.getSize();
      const fontSize = 12;
      
      // Embed Times Roman font that supports more characters
      const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

      // Draw content
      const margin = 50;
      let y = height - margin;

      // Title
      page.drawText('SO HUU TRI TUE VIET NAM', {
        x: margin,
        y,
        size: 16,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      y -= 30;

      // Document title
      page.drawText(`CONG VAN SO ${doc.code}`, {
        x: margin,
        y,
        size: 14,
        font: boldFont,
        color: rgb(0, 0.2, 0.6),
      });
      y -= 25;

      // Divider
      page.drawLine({
        start: { x: margin, y },
        end: { x: width - margin, y },
        thickness: 1,
        color: rgb(0.8, 0.8, 0.8),
      });
      y -= 20;

      // Content
      const content = [
        `Ma CV: ${removeDiacritics(doc.code)}`,
        `Ten: ${removeDiacritics(doc.name)}`,
        `Ngay: ${doc.date}`,
        `Loai: ${removeDiacritics(doc.type)}`,
        `Mo ta: ${removeDiacritics(doc.description)}`,
        '',
        'Noi dung cong van:',
        `Cong van nay xac nhan viec ${removeDiacritics(doc.type).toLowerCase()} bao ho so huu tri tue cho "${removeDiacritics(doc.name)}".`,
        '',
        'Thong tin bo sung:',
        '- Cong van nay la tai lieu chinh thuc cua So Huu Tri Tue Viet Nam',
        '- Ma tham chieu: ' + doc.id,
        '- Ten tep: ' + removeDiacritics(doc.filename),
      ];

      for (const line of content) {
        if (y < margin + 20) {
          // Add new page if needed
          const newPage = pdfDoc.addPage([595, 842]);
          y = height - margin;
          page = newPage;
        }

        const textFont = line.includes('CV') || line.includes('Nội dung') || line.includes('Thông tin') ? boldFont : font;
        const textSize = line.includes('Nội dung') || line.includes('Thông tin') ? 11 : fontSize;
        const textColor = line.startsWith('-') ? rgb(0.4, 0.4, 0.4) : rgb(0, 0, 0);

        page.drawText(line, {
          x: margin + (line.startsWith('-') ? 20 : 0),
          y,
          size: textSize,
          font: textFont,
          color: textColor,
          maxWidth: width - 2 * margin - 20,
        });
        y -= 16;
      }

      // Footer
      page.drawText(`Tao ngay: ${new Date().toLocaleDateString('vi-VN')}`, {
        x: margin,
        y: margin,
        size: 9,
        font,
        color: rgb(0.6, 0.6, 0.6),
      });

      // Save PDF
      const pdfBytes = await pdfDoc.save();
      fs.writeFileSync(pdfPath, pdfBytes);
      console.log(`✓ ${doc.filename}`);
    }

    console.log(`\n✅ Tat ca ${documents.length} PDF da duoc tao thanh cong!`);
    console.log(`📁 Thu muc: public/documents/`);

  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
}

generatePDFs();
