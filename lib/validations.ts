import { z } from 'zod';

// Document validation schema
export const CreateDocumentSchema = z.object({
  code: z.string().min(1, 'Mã công văn không được để trống'),
  date: z.string().regex(/^\d{8}$/, 'Ngày phải theo định dạng DDMMYYYY'),
  name: z.string().min(1, 'Tên công văn không được để trống'),
  filename: z.string().min(1, 'Tên file không được để trống'),
  type: z.string().min(1, 'Loại công văn không được để trống'),
  description: z.string().min(1, 'Mô tả không được để trống'),
});

export const UpdateDocumentSchema = CreateDocumentSchema.partial();

// Login validation schema
export const LoginSchema = z.object({
  username: z.string().min(1, 'Tên đăng nhập không được để trống'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

// Activity log schema
export const CreateActivityLogSchema = z.object({
  action: z.enum(['UPLOAD', 'DELETE', 'VIEW', 'DOWNLOAD', 'LOGIN', 'LOGOUT']),
  resource: z.string(),
  resourceId: z.string(),
  details: z.string().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
});

// Type exports
export type CreateDocumentInput = z.infer<typeof CreateDocumentSchema>;
export type UpdateDocumentInput = z.infer<typeof UpdateDocumentSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type CreateActivityLogInput = z.infer<typeof CreateActivityLogSchema>;
