import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Building2, Lock, Mail, Users } from 'lucide-react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const roles = [
    { value: 'super_admin', label: 'Super Admin' },
    { value: 'procurement', label: 'Procurement Team' },
    { value: 'production', label: 'Production Team' },
    { value: 'distribution', label: 'Distribution & Delivery' },
    { value: 'accounts', label: 'Accounts / Finance' },
  ]

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login - in production this would be real auth
    setTimeout(() => {
      localStorage.setItem('userRole', role)
      localStorage.setItem('userEmail', email)
      setIsLoading(false)
      navigate({ to: '/dashboard' })
    }, 1000)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-sidebar-foreground">
              BusinessCore
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-sidebar-foreground leading-tight">
            Centralized Business
            <br />
            Management Platform
          </h1>
          <p className="text-sidebar-muted text-lg max-w-md">
            Manage your entire operational cycle from procurement to delivery,
            with complete visibility and financial tracking.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-6">
            {[
              { label: 'Procurement', icon: '📦' },
              { label: 'Production', icon: '🏭' },
              { label: 'Distribution', icon: '🚚' },
              { label: 'Accounting', icon: '📊' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sidebar-foreground font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sidebar-muted text-sm">
          © 2024 BusinessCore. All rights reserved.
        </p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              BusinessCore
            </span>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Select Role</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger className="pl-10 h-11 w-full">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading || !email || !password || !role}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Need help?{' '}
            <a
              href="#"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
