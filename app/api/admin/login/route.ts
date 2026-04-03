import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { LoginSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate input
    const validation = LoginSchema.safeParse({ username, password });
    if (!validation.success) {
      return NextResponse.json({ error: 'Dữ liệu không hợp lệ' }, { status: 400 });
    }

    // Strict: env vars MUST be set. No hardcoded fallbacks.
    const envUser = process.env.ADMIN_USERNAME;
    const envPass = process.env.ADMIN_PASSWORD;
    
    if (!envUser || !envPass) {
      logger.error('ADMIN_USERNAME or ADMIN_PASSWORD env var not configured');
      return NextResponse.json({ error: 'Hệ thống chưa được cấu hình' }, { status: 503 });
    }
    
    let adminUser: any = null;

    if (username === envUser && password === envPass) {
      logger.info(`Fallback login successful for "${username}" via ENV`);
      adminUser = {
        id: 'env-default',
        username: envUser,
        isActive: true
      };
    } else {
      // Find admin user in DB
      adminUser = await prisma.adminUser.findUnique({
        where: { username },
      });

      if (!adminUser || adminUser.password !== password) {
        // Log failed attempt
        try {
          await prisma.activityLog.create({
            data: {
              action: 'LOGIN_FAILED',
              resource: 'AdminUser',
              resourceId: username,
              details: 'Invalid credentials',
              ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
              userAgent: request.headers.get('user-agent') || 'unknown',
            },
          });
        } catch (e) {}

        logger.warn('Failed login attempt', { username });
        return NextResponse.json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' }, { status: 401 });
      }

      if (!adminUser.isActive) {
        return NextResponse.json({ error: 'Tài khoản này đã bị vô hiệu hóa' }, { status: 403 });
      }
    }

    try {
      // Log successful login
      await prisma.activityLog.create({
        data: {
          action: 'LOGIN_SUCCESS',
          resource: 'AdminUser',
          resourceId: adminUser.id,
          details: `Admin login${adminUser.id === 'env-default' ? ' (Fallback)' : ''}`,
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          userAgent: request.headers.get('user-agent') || 'unknown',
        },
      });
    } catch(e) {}

    // Create response with cookie
    const response = NextResponse.json({ 
      success: true, 
      user: { 
        id: adminUser.id, 
        username: adminUser.username, 
        email: adminUser.email || '' 
      } 
    });
    
    // Set cookie with token
    response.cookies.set('admin_token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 giờ
    });

    logger.info('Admin login successful', { username });
    return response;
  } catch (error) {
    logger.error('Login error', error instanceof Error ? error : new Error(String(error)));
    return NextResponse.json({ error: 'Lỗi login' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get admin user from cookie if available for logging
    const cookies = request.headers.get('cookie');
    
    if (cookies && cookies.includes('admin_token')) {
      logger.info('Admin logout');
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', '', { maxAge: 0 });
    return response;
  } catch (error) {
    logger.error('Logout error', error instanceof Error ? error : new Error(String(error)));
    return NextResponse.json({ error: 'Lỗi logout' }, { status: 500 });
  }
}
