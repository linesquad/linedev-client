import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/about"!</div>
}
