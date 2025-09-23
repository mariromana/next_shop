import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';
export async function GET() {
    const ingredients = await prisma.ingredient.findMany();

    return NextResponse.json(ingredients);
}
