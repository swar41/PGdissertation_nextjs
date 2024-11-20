'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, FileText, MessageSquare, LogOut, Menu, Upload } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface Paper {
  id: string;
  title: string;
  content: string;
}

export default function StudentDashboard() {
  const [papers, setPapers] = useState<Paper[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Track page view on load
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Student Dashboard',
        page_location: window.location.href,
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validate form fields
    if (!title || !content || !pdfFile) {
      setError('Please fill in all fields and upload a PDF file.')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('pdfFile', pdfFile)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      // Check if the response is OK
      if (!response.ok) {
        const responseBody = await response.text()
        console.error('API Response Error:', responseBody)
        throw new Error('Failed to submit paper')
      }

      const newPaper = await response.json()
      setPapers([...papers, newPaper])
      setTitle('')
      setContent('')
      setPdfFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      setSuccess('Paper submitted successfully!')

      // Track paper submission success event
      if (window.gtag) {
        window.gtag('event', 'submit_paper', {
          event_category: 'Student Dashboard',
          event_label: title,
        })
      }
    } catch (error) {
      console.error('Error submitting paper:', error)
      setError('Failed to submit paper. Please try again.')

      // Track paper submission failure event
      if (window.gtag) {
        window.gtag('event', 'submit_paper_failed', {
          event_category: 'Student Dashboard',
          event_label: title,
        })
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0])

      // Track file upload event
      if (window.gtag) {
        window.gtag('event', 'upload_pdf', {
          event_category: 'Student Dashboard',
          event_label: e.target.files[0].name,
        })
      }
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)

    // Track sidebar toggle event
    if (window.gtag) {
      window.gtag('event', isSidebarOpen ? 'close_sidebar' : 'open_sidebar', {
        event_category: 'Student Dashboard',
      })
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        router.push('/login')

        // Track logout event
        if (window.gtag) {
          window.gtag('event', 'logout', {
            event_category: 'User Actions',
          })
        }
      } else {
        throw new Error('Logout failed')
      }
    } catch (error) {
      console.error('Error during logout:', error)
      setError('Failed to logout. Please try again.')
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 min-h-screen flex flex-col ${isSidebarOpen ? 'block' : 'hidden'} md:block transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-center h-20 border-b">
          <div className="ml-4">
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-600">Student</p>
          </div>
        </div>
        <nav className="flex-grow">
          <ul className="p-4">
            <li className="mb-4">
              <div className="flex items-center">
                <FileText className="mr-2" />
                <span>Project Progress</span>
              </div>
              <Progress value={33} className="mt-2" />
            </li>
            <li className="mb-4">
              <Link href="/chat" className="flex items-center text-blue-600 hover:text-blue-800">
                <MessageSquare className="mr-2" />
                <span>Chat with Mentor</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full flex items-center justify-center" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white border-b md:hidden">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <Button variant="outline" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4 md:hidden">Student Dashboard</h1>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="mb-4">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Papers</h2>
                {papers.length > 0 ? (
                  <ul className="bg-white shadow rounded-lg divide-y">
                    {papers.map((paper: Paper) => (
                      <li key={paper.id} className="p-4">
                        <h3 className="font-medium">{paper.title}</h3>
                        <p className="text-gray-600 truncate">{paper.content}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="bg-white shadow rounded-lg p-4">
                    <p className="text-gray-600">No papers submitted yet.</p>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Submit New Paper</h2>
                <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4">
                  <Input
                    type="text"
                    placeholder="Paper Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-4"
                  />
                  <Textarea
                    placeholder="Write your paper content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mb-4"
                    rows={10}
                  />
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="mb-4"
                    ref={fileInputRef}
                  />
                  <Button type="submit" className="w-full">
                    Submit Paper
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
