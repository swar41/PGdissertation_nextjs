import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Tracking the login button click event in GA
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'Button',
        event_label: 'Login Button Click',
      });
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('role', userData.role);
        router.push(userData.role === 'student' ? '/sdash' : '/mdash');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed, please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <Button type="submit" className="px-6 py-2 mt-4" disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
              </Button>
              <Link href="/signup" className="text-sm text-blue-600 hover:underline">
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
