import { NextResponse } from 'next/server';
import { z } from 'zod';
import { addSubscriber } from '@/lib/audience/listmonk';
import { trackSubscription } from '@/lib/analytics/server';

const subscribeSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address' }),
  name: z.string().optional(),
  source: z.string().default('unknown'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = subscribeSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues?.[0]?.message || 'Invalid email';
      return NextResponse.json(
        { error: firstError },
        { status: 400 }
      );
    }

    const { email, name, source } = parsed.data;

    const result = await addSubscriber(email, name);

    await trackSubscription(email, source, result.success);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to subscribe' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Subscribe API]', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
