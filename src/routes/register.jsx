import { createFileRoute } from '@tanstack/react-router'
import Register from '../Register.jsx'

export const Route = createFileRoute('/register')({
  component: Register,
})