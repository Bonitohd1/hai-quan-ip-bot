# Hướng dẫn cấu hình đăng nhập Google

## 1. Tạo Google OAuth Credentials

### Bước 1: Truy cập Google Cloud Console
- Đi đến https://console.cloud.google.com
- Tạo một project mới hoặc chọn project hiện có

### Bước 2: Bật Google+ API
- Tìm "Google+ API" trong Marketplace
- Click "Enable" để bật API

### Bước 3: Tạo OAuth Credentials
1. Đi đến "Credentials" trong menu bên trái
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. Chọn "Web application"
4. Thêm Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (cho development)
   - `https://yourdomain.com/api/auth/callback/google` (cho production)
5. Click "Create"

### Bước 4: Copy Client ID và Client Secret
- Copy **Client ID** và **Client Secret**
- Lưu vào file `.env.local`:

```env
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

GOOGLE_ID=your_google_client_id_here
GOOGLE_SECRET=your_google_client_secret_here
```

## 2. Chạy ứng dụng

```bash
npm install
npm run dev
```

Mở http://localhost:3000 trong trình duyệt

## 3. Kiểm tra

- Bạn sẽ được chuyển hướng đến trang `/auth/signin`
- Click "Đăng nhập với Google"
- Đăng nhập bằng tài khoản Gmail của bạn
- Sau khi đăng nhập thành công, bạn sẽ được chuyển về trang chủ

## Lưu ý bảo mật

1. **NEXTAUTH_SECRET**: Thay đổi giá trị này trong production
   ```bash
   openssl rand -base64 32
   ```

2. Không commit `.env.local` vào version control

3. Trong production, sử dụng biến môi trường thực từ hosting provider

## Lỗi thường gặp

### Redirect URI mismatch
- Đảm bảo redirect URI trong Google Console khớp với URL ứng dụng

### Session undefined
- Kiểm tra `NEXTAUTH_SECRET` đã được thiết lập

### CORS error
- Ensure NEXTAUTH_URL environment variable is set correctly
