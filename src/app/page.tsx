import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import Contact from "@/components/sections/contact"
import { Chat } from "@/components/chat"
import { Navigation } from "@/components/navigation"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ThemeSwitcher />
      <div className="space-y-20 pt-16 pb-8">
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
      <Chat />
    </main>
  )
} 
