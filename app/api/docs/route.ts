import { NextRequest, NextResponse } from 'next/server';
import { swaggerSpec } from '@/lib/swagger';

/**
 * @swagger
 * /api/docs:
 *   get:
 *     summary: Get Swagger/OpenAPI specification
 *     description: Returns the OpenAPI specification for the API
 *     responses:
 *       200:
 *         description: OpenAPI specification
 */
export async function GET(request: NextRequest) {
  return NextResponse.json(swaggerSpec);
}
