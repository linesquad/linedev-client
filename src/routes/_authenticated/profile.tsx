import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfileComponent,
})

function ProfileComponent() {
  return <div>Hello "/_authenticated/profile"!</div>
}
