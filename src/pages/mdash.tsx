import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import Textarea from '../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { User, Users, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Define the Paper interface
interface Paper {
  id: string;
  title: string;
  content: string;
}

export default function MentorDashboard() {
  const [assignedPapers, setAssignedPapers] = useState<Paper[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAssignedPapers = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/assigned-papers');
        if (!response.ok) {
          throw new Error('Failed to fetch assigned papers');
        }
        const data: Paper[] = await response.json();
        setAssignedPapers(data);

        // Track the fetching of papers
        window.ga('send', 'event', 'Dashboard', 'load', 'Assigned Papers Loaded');
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedPapers();
  }, []);

  const handlePaperSelect = (paper: Paper) => {
    setSelectedPaper(paper);
    setComment('');

    // Track paper selection
    window.ga('send', 'event', 'Dashboard', 'select', `Paper Selected: ${paper.title}`);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPaper) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/papers/${selectedPaper.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      // Track comment submission
      window.ga('send', 'event', 'Dashboard', 'submit', 'Comment Submitted');
      console.log('Comment submitted', { paperId: selectedPaper.id, comment });
      setComment('');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Track logout
        window.ga('send', 'event', 'Dashboard', 'logout', 'User Logged Out');
        // Redirect to login page after successful logout
        router.push('/login');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred during logout');
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 min-h-screen flex flex-col ${isSidebarOpen ? 'block' : 'hidden'} md:block transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-center h-20 border-b">
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Jane Doe</h2>
            <p className="text-gray-600">Mentor</p>
          </div>
        </div>
        <nav className="flex-grow">
          <ul className="p-4">
            <li className="mb-4">
              <div className="flex items-center">
                <Users className="mr-2" />
                <span>Students Handled: 5</span>
              </div>
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
          <h1 className="text-2xl font-bold">Mentor Dashboard</h1>
          <Button variant="primary" onClick={toggleSidebar}>
            <Menu />
          </Button>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4 md:hidden">Mentor Dashboard</h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Assigned Papers</h2>
                {loading ? (
                  <p>Loading papers...</p>
                ) : (
                  <ul className="bg-white shadow rounded-lg divide-y">
                    {assignedPapers.map((paper) => (
                      <li
                        key={paper.id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 ${
                          selectedPaper?.id === paper.id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => handlePaperSelect(paper)}
                      >
                        {paper.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Paper Details</h2>
                {selectedPaper ? (
                  <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">{selectedPaper.title}</h3>
                    <p className="mb-4">{selectedPaper.content}</p>
                    <form onSubmit={handleSubmitComment}>
                      <Textarea
                        placeholder="Add a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mb-4"
                        rows={4}
                        required
                      />
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Comment'}
                      </Button>
                    </form>
                  </div>
                ) : (
                  <p className="bg-white shadow rounded-lg p-4">Select a paper to view details and add comments.</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
