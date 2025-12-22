import React, { lazy, Suspense } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import LeetCodeStats from './components/LeetCodeStats';
import Resume from "./components/Resume";

// Lazy load components that aren't immediately visible
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <About />
        <Resume />
        <Projects />
        <LeetCodeStats />
        <Experience />
         <Skills />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;