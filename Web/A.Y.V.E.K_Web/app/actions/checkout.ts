'use server'

import { createCheckout } from "@/lib/lemonsqueezy"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function processCheckout(variantId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/signin')
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL
    if (!baseUrl) {
        throw new Error("Configuration Error: NEXT_PUBLIC_URL is not set.")
    }

    const checkoutUrl = await createCheckout(
        variantId,
        `${baseUrl}/dashboard`,
        user.id,
        user.email
    )

    if (checkoutUrl.url) {
        redirect(checkoutUrl.url)
    }
}
