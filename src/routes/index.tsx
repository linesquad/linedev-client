import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/main/Hero'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Hero />
}
