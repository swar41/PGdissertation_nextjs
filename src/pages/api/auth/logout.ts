import { NextApiRequest, NextApiResponse } from 'next'
import { destroyCookie } from 'nookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    // Clear the authentication cookie
    destroyCookie({ res }, 'auth_token', {
      path: '/',
    })

    // Clear any server-side session data if applicable
    // For example, if you're using a database to store sessions:
    // await db.session.delete({ where: { userId: req.user.id } })

    // Send a success response
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Error during logout:', error)
    res.status(500).json({ message: 'An error occurred during logout' })
  }
}