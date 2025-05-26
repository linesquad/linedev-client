import * as React from 'react'
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { AuthContext } from '../hooks/useAuth'

type RouterContext = {
  authentication: AuthContext
}
export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})


function RootComponent() {
  return (
    <React.Fragment>
      <div>My App</div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/register">register</Link>
        </li>
      </ul>
      <Outlet />
    </React.Fragment>
  )
}
