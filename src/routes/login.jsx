import { createFileRoute } from '@tanstack/react-router'
import Login from '../Login.jsx'

export const Route = createFileRoute('/login')({
  component: Login,
})