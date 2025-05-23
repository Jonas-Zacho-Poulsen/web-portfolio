import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Skills } from '@/components/sections/skills'
import { Projects } from '@/components/sections/projects'
import Contact from '@/components/sections/contact'
import { Chat } from '@/components/chat'
import { Navigation } from '@/components/navigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-grow pt-8 w-full"> {/* Reduced top padding */}
        <div className="space-y-6 py-2 w-full"> {/* Reduced vertical spacing */}
          <section id="home" className="scroll-mt-10 min-h-[80vh] flex items-center justify-center w-full">
            <Hero />
          </section>
          <section id="about" className="scroll-mt-10 min-h-[80vh] flex items-center justify-center w-full -mt-16"> {/* Increased negative margin to reduce space */}
            <About />
          </section>
          <section id="skills" className="scroll-mt-12 min-h-[90vh] flex items-center justify-center w-full">
            <Skills />
          </section>
          <section id="projects" className="scroll-mt-12 min-h-[90vh] flex items-center justify-center w-full">
            <Projects />
          </section>
          <section id="contact" className="scroll-mt-16 min-h-screen flex items-center justify-center w-full">
            <Contact />
          </section>
        </div>
      </main>
      <Chat />
    </div>
  )
}
