// pages/signup.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select } from '../components/ui/select';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const router = useRouter();

  useEffect(() => {
    // Track page view when the signup page is loaded
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Signup Page',
        page_location: window.location.href,
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Track form submission event with role
      if (window.gtag) {
        window.gtag('event', 'submit_signup', {
          event_category: 'User Registration',
          event_label: email,  // Use email or another identifier for tracking
          role: role,           // Track the role of the user (student or mentor)
        });
      }

      // Call the signup API
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (res.ok) {
        console.log('Signup successful');
        router.push('/login'); // Redirect to login after signup

        // Track signup success event with role
        if (window.gtag) {
          window.gtag('event', 'signup_success', {
            event_category: 'User Registration',
            event_label: email,
            role: role,           // Track the role of the user in the success event
          });
        }
      } else {
        const errorData = await res.json();
        console.error('Signup failed:', errorData.message);

        // Track signup failure event with role
        if (window.gtag) {
          window.gtag('event', 'signup_failed', {
            event_category: 'User Registration',
            event_label: email,
            role: role,           // Track the role of the user in the failure event
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);

      // Track signup failure event with role
      if (window.gtag) {
        window.gtag('event', 'signup_failed', {
          event_category: 'User Registration',
          event_label: email,
          role: role,           // Track the role of the user in the failure event
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Create an account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                placeholder="Full Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mt-4">
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
            <div className="mt-4">
              <Label htmlFor="role">Role</Label>
              <Select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                options={[
                  { value: 'student', label: 'Student' },
                  { value: 'mentor', label: 'Mentor' },
                ]}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-baseline justify-between">
              <Button type="submit" className="px-6 py-2 mt-4">
                Sign Up
              </Button>
              <Link href="/login" className="text-sm text-blue-600 hover:underline">
                Already have an account? Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
