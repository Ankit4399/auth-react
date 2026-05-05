import { createFileRoute } from '@tanstack/react-router'
import Home from '../Home.jsx'

export const Route = createFileRoute('/home')({
  component: Home,
})