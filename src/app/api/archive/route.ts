import { NextRequest, NextResponse } from 'next/server';
import { archiver } from '@/lib/archiver';
import { supabaseArchiver } from '@/lib/supabase-archiver';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const type = url.searchParams.get('type') || 'stats';
    const days = parseInt(url.searchParams.get('days') || '7');

            // Use local archiver for now (Supabase logging not working)
            console.log('Using local archiver for archive data');
            
            switch (type) {
              case 'stats':
                const stats = await archiver.getArchiveStats();
                return NextResponse.json({ stats });

              case 'recent':
                const recentLogs = await archiver.getRecentLogs(days);
                return NextResponse.json({ logs: recentLogs });

              case 'conversations':
                const { conversations } = await archiver.getRecentLogs(days);
                return NextResponse.json({ conversations });

              case 'artifacts':
                const { artifacts } = await archiver.getRecentLogs(days);
                return NextResponse.json({ artifacts });

              default:
                return NextResponse.json(
                  { error: 'Invalid type parameter. Use: stats, recent, conversations, or artifacts' },
                  { status: 400 }
                );
            }
  } catch (error) {
    console.error('Archive API Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve archive data' },
      { status: 500 }
    );
  }
}
