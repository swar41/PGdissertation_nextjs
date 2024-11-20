// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import User from '../../models/User'; // Assuming you have a User model defined

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    await connectToDatabase(); // Connect to the database

    // Find the user with the provided email
    const user = await User.findOne({ email });

    // Validate user existence and password
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Send back the user role
    res.status(200).json({ role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
