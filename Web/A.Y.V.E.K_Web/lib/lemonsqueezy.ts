export async function createCheckout(variantId: string, redirectUrl: string, userId: string, userEmail?: string) {
    const apiKey = process.env.LEMON_SQUEEZY_API_KEY
    const storeId = process.env.LEMON_SQUEEZY_STORE_ID

    if (!apiKey || !storeId) {
        throw new Error("Lemon Squeezy configuration missing: API Key or Store ID not found.")
    }

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
        method: 'POST',
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            data: {
                type: 'checkouts',
                attributes: {
                    checkout_data: {
                        email: userEmail,
                        custom: {
                            user_id: userId
                        }
                    },
                    product_options: {
                        redirect_url: redirectUrl,
                    }
                },
                relationships: {
                    store: {
                        data: {
                            type: 'stores',
                            id: storeId
                        }
                    },
                    variant: {
                        data: {
                            type: 'variants',
                            id: variantId
                        }
                    }
                }
            }
        })
    })

    const data = await response.json()
    return { url: data.data?.attributes?.url }
}
