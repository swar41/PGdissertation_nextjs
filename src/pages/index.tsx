import Link from 'next/link'
import { Button } from '../components/ui/button'
import { GraduationCap, ClipboardIcon, UsersIcon, BarChartIcon } from 'lucide-react'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <GraduationCap className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#team">
            Team
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
            Contact 
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
          <div className="absolute inset-0 bg-cover bg-center z-0" style={{backgroundImage: "url('https://images.unsplash.com/photo-1516979187457-637abb4f9353?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVhY2hpbmd8ZW58MHx8MHx8fDA%3D')",}}/>
          <div className="relative z-10 container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-black">
                  Streamline Your Academic Journey
                </h1>
                <p className="mx-auto max-w-[700px] text-black md:text-xl">
                  Collaborate with mentors, track your progress, and excel in your research papers.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup">
                  <Button>Get Started</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="bg-white text-gray-900 hover:bg-gray-100">Log In</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <ClipboardIcon className="h-10 w-10" />
                <h2 className="text-xl font-bold">Organize Your Research</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Keep all your research materials and drafts in one place.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <UsersIcon className="h-10 w-10" />
                <h2 className="text-xl font-bold">Mentor Collaboration</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Get real-time feedback and guidance from your assigned mentors.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <BarChartIcon className="h-10 w-10" />
                <h2 className="text-xl font-bold">Track Your Progress</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Set milestones and monitor your progress throughout your project.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
            <p className="text-xl text-center max-w-3xl mx-auto">
              We are dedicated to empowering students and researchers to achieve their academic goals. Our platform provides a seamless environment for collaboration between students and mentors, enabling efficient research paper development and progress tracking.
            </p>
          </div>
        </section>
        <section id="team" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Gaurang Goyal", image: "/placeholder.svg?height=400&width=400" },
                { name: "Jaice S Joseph", image: "/placeholder.svg?height=400&width=400" },
                { name: "Shashank Hegde", image: "/placeholder.svg?height=400&width=400" },
                { name: "Swaroop K R", image: "/placeholder.svg?height=400&width=400" }
              ].map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-full mb-4"
                  />
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Computer Science Technology</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Dayananda Sagar University</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
       
          <div className="container px-4 md:px-6">
          

            <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
            <form className="max-w-md mx-auto">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required></textarea>
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
            
          </div>
         

        </section>
        <section id="team" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"> <h2 className="text-3xl font-bold text-center mb-8">Feedback</h2> <div className="flex justify-center items-center min-h-screen">
  <div className="w-full max-w-2xl px-4">
    <iframe
      src="https://qsleoc1dt6p.typeform.com/to/pEwal0dV"
      width="100%"
      height="500px"
      frameBorder="0"
      style={{ border: "0", overflow: "hidden" }}
      allow="fullscreen; autoplay"
    ></iframe>
  </div>
</div>
      </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}