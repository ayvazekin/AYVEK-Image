import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: Request) {
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET

    if (!secret) {
        return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    // Get raw body
    const rawBody = await request.text()

    // Verify signature
    const hmac = crypto.createHmac('sha256', secret)
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8')
    const signature = Buffer.from(request.headers.get('X-Signature') || '', 'utf8')

    if (!crypto.timingSafeEqual(digest, signature)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const data = JSON.parse(rawBody)
    const eventName = data.meta.event_name

    console.log(`Received Lemon Squeezy event: ${eventName}`)

    // Handle events (subscription_created, etc.)
    // Here you would update your Supabase database

    return NextResponse.json({ received: true })
}
