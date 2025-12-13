# Sở Hữu Trí Tuệ Hải Quan Dashboard

Hệ thống quản lý và tra cứu công văn sở hữu trí tuệ của Hải quan Việt Nam.

## 🚀 Tính Năng

- 📄 **Quản lý công văn**: Upload, tìm kiếm, tải xuống tài liệu PDF
- 🔍 **Tra cứu thông minh**: Tìm kiếm theo mã CV, tên, ngày
- 👤 **Xác thực quản trị**: Đăng nhập admin bảo mật
- 📊 **Thống kê**: Xem số liệu công văn theo loại
- 📱 **Responsive Design**: Hoạt động tốt trên mobile và desktop
- 🗄️ **Database**: PostgreSQL + Prisma ORM
- 📝 **Logging**: Hệ thống ghi nhật ký hoạt động
- 📚 **API Docs**: Swagger/OpenAPI documentation
- 🐳 **Docker**: Container hóa hoàn chỉnh
- 🏥 **Health Check**: Endpoint kiểm tra sức khỏe hệ thống

## 📋 Yêu Cầu

- Node.js 18+
- PostgreSQL 14+ hoặc Supabase
- npm hoặc pnpm
- Docker & Docker Compose (optional)

## 🛠️ Cài Đặt

### 1. Clone Repository

```bash
git clone https://github.com/Bonitohd1/hai-quan-ip-bot.git
cd hai-quan-ip-bot
```

### 2. Cài Đặt Dependencies

```bash
npm install
# hoặc
pnpm install
```

### 3. Setup Database

#### Cách A: Dùng PostgreSQL Local

```bash
# Tạo database
createdb soi_huu_tri_tue_hai_quan_db

# Update .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/soi_huu_tri_tue_hai_quan_db"

# Chạy migration
npx prisma migrate dev --name init
```

#### Cách B: Dùng Supabase (Recommended)

1. Tạo tài khoản tại https://supabase.com
2. Tạo project mới
3. Copy connection string vào `.env`

```bash
DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]"
```

### 4. Setup Environment Variables

```bash
cp .env.example .env

# Edit .env với giá trị của bạn
# DATABASE_URL, NEXTAUTH_SECRET, etc.
```

### 5. Chạy Migration Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 6. Chạy Development Server

```bash
npm run dev
```

Truy cập: http://localhost:3000

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Push code lên GitHub
git push origin main

# Vercel sẽ tự động deploy
# Thêm environment variables trong Vercel Dashboard
```

### Docker

```bash
# Build image
docker build -t soi-huu-tri-tue .

# Chạy container
docker run -p 3000:3000 soi-huu-tri-tue
```

### Docker Compose

```bash
# Chạy toàn bộ stack (app + postgres)
docker-compose up -d

# Chạy migration
docker-compose exec app npx prisma migrate deploy

# Stop
docker-compose down
```

## 📚 API Documentation

Swagger API docs: http://localhost:3000/api/docs

### Key Endpoints

- `POST /api/admin/login` - Đăng nhập admin
- `GET /api/documents` - Lấy danh sách công văn
- `POST /api/documents` - Upload công văn mới
- `DELETE /api/documents?code=XXX` - Xóa công văn
- `GET /api/health` - Health check

## 👤 Tài Khoản Admin

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **THAY ĐỔI SAU KHI CÀI ĐẶT**

## 📂 Cấu Trúc Thư Mục

```
.
├── app/
│   ├── api/                 # API routes
│   ├── admin/              # Admin pages
│   ├── tra-cuu/            # Search page
│   └── layout.tsx
├── components/             # React components
├── lib/
│   ├── prisma.ts          # Prisma client
│   ├── logger.ts          # Logging utility
│   ├── validations.ts     # Zod schemas
│   └── swagger.ts         # Swagger config
├── prisma/
│   └── schema.prisma      # Database schema
├── public/
│   └── documents/         # PDF files
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## 🔧 Các Lệnh Chính

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint

# Database
npx prisma migrate dev        # Tạo migration
npx prisma migrate deploy     # Deploy migrations
npx prisma studio            # Prisma Studio UI
npx prisma generate          # Generate Prisma client

# Docker
docker-compose up -d          # Start services
docker-compose down           # Stop services
docker-compose logs -f app    # View logs
```

## 🔐 Security

- Admin authentication với httpOnly cookies
- Input validation với Zod
- Middleware protection cho admin routes
- Environment variables cho sensitive data
- Rate limiting recommended (implement với next-rate-limit)

## 📊 Database Schema

### Document
- `id` - UUID (Primary Key)
- `code` - Mã công văn (Unique)
- `date` - Ngày (DDMMYYYY)
- `name` - Tên công văn
- `filename` - Tên file PDF
- `type` - Loại (Gia hạn, Cấp mới, etc)
- `description` - Mô tả
- `createdAt`, `updatedAt`

### AdminUser
- `id` - UUID
- `username` - Tên đăng nhập
- `password` - Mật khẩu
- `email` - Email (optional)
- `isActive` - Trạng thái

### ActivityLog
- `id` - UUID
- `action` - UPLOAD, DELETE, VIEW, DOWNLOAD
- `resource` - document, user
- `resourceId` - ID của resource
- `details` - JSON data
- `ipAddress` - IP người dùng
- `createdAt`

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Kiểm tra DATABASE_URL trong .env
echo $DATABASE_URL

# Test connection
npx prisma db execute --stdin < /dev/null
```

### Port 3000 đang sử dụng
```bash
# Dùng port khác
PORT=3001 npm run dev
```

### Prisma migration issues
```bash
# Reset database (xóa tất cả data)
npx prisma migrate reset

# Tạo migration mới
npx prisma migrate dev --name <name>
```

## 📝 Log

Logs được lưu trong console khi development. Trong production, có thể config gửi đến external logging service.

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - xem LICENSE file

## 📞 Support

Email: support@example.com
GitHub Issues: https://github.com/Bonitohd1/hai-quan-ip-bot/issues
