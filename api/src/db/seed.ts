import { db } from "./index"
import { webhooks } from "./schema"
import { faker } from '@faker-js/faker'

// Common Stripe webhook event types
const stripeEventTypes = [
 'charge.succeeded',
  'charge.failed',
  'charge.refunded',
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
  'payment_intent.created',
  'invoice.paid',
  'invoice.payment_failed',
  'invoice.created',
  'invoice.finalized',
  'customer.created',
  'customer.updated',
  'customer.deleted',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'checkout.session.completed',
  'checkout.session.expired',
  'payment_method.attached',
  'payment_method.detached',
]

function generateStripeWebhookEvent() {
  const eventType = faker.helpers.arrayElement(stripeEventTypes)
  const amount = faker.number.int({ min: 1000, max: 50000 })
  const currency = faker.helpers.arrayElement(['usd', 'eur', 'brl'])
  
  // Base Stripe event structure
  const stripeEvent = {
    id: `evt_${faker.string.alphanumeric(24)}`,
    object: 'event',
    api_version: '2023-10-16',
    created: faker.date.recent({ days: 30 }).getTime() / 1000,
        data: {
      object: {
        id: eventType.includes('charge')
          ? `ch_${faker.string.alphanumeric(24)}`
          : eventType.includes('payment_intent')
          ? `pi_${faker.string.alphanumeric(24)}`
          : eventType.includes('invoice')
          ? `in_${faker.string.alphanumeric(24)}`
          : eventType.includes('customer')
          ? `cus_${faker.string.alphanumeric(14)}`
          : `cs_${faker.string.alphanumeric(24)}`,
        object: eventType.split('.')[0],
        amount: amount,
        currency: currency,
        customer: `cus_${faker.string.alphanumeric(14)}`,
        description: faker.company.catchPhrase(),
        status: eventType.includes('failed') ? 'failed' : 'succeeded',
        receipt_email: faker.internet.email(),
      },
    },
    livemode: false,
    pending_webhooks: 0,
    request: {
      id: `req_${faker.string.alphanumeric(24)}`,
      idempotency_key: faker.string.uuid()
    },
    type: eventType
  }

  const headers = {
    'content-type': 'application/json',
    'stripe-signature': `t=${Math.floor(Date.now() / 1000)},v1=${faker.string.alphanumeric(64)}`,
    'user-agent': 'Stripe/1.0 (+https://stripe.com/docs/webhooks)',
    'accept': '*/*',
    'accept-encoding': 'gzip, deflate',
    'x-stripe-client-user-agent': JSON.stringify({
      bindings_version: '10.0.0',
      lang: 'node',
      lang_version: '18.0.0',
      platform: 'linux',
      publisher: 'stripe',
    }),
  }

  const bodyString = JSON.stringify(stripeEvent, null, 2)

  return {
    method: 'POST',
    pathname: '/webhooks/stripe',
    ip: faker.internet.ipv4(),
    statusCode: faker.helpers.arrayElement([200, 200, 200, 200, 500]), // Maioria 200
    contentType: 'application/json',
    contentLength: Buffer.byteLength(bodyString),
    queryParams: {},
    headers: headers,
    body: bodyString,
    createdAt: faker.date.recent({ days: 30 }),
  }
}

async function seed() {

  console.log('🌱 Seeding database...')

//   await db.delete(webhooks)
  // Generate 60 webhook events
  const webhookEvents = Array.from({ length: 60 }, generateStripeWebhookEvent)

// Ordenar por data de criação (mais antigos primeiro)
  webhookEvents.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

  // Insert all events
  await db.insert(webhooks).values(webhookEvents)
  
  console.log('✅ Database seeded successfully with 60 Stripe webhooks!')
}

seed().catch(console.error)