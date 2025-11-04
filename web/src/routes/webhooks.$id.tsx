import { createFileRoute } from '@tanstack/react-router'
import { WebhookDetails } from '../components/webhook-details'
import { Suspense } from 'react'

export const Route = createFileRoute('/webhooks/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return (
    <Suspense
      fallback={
        <p className="flex h-full justify-center items-center">Carregando...</p>
      }
    >
      <WebhookDetails id={id} />
    </Suspense>
  )
}
