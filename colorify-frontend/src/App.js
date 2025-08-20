import React, { useState } from 'react';
import Navbar from "./components/Navbar";
import HexFinder from "./components/HexFinder";
import Templates from "./components/Templates";
import Suggestions from "./components/Suggestions";
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch(activeSection) {
      case 'hex-finder':
        return <HexFinder />;
      case 'templates':
        return <Templates />;
      case 'suggestions':
        return <Suggestions />;
      default:
        return (
          <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
              <div className="hero-container">
                <div className="hero-content">
                  <h1 className="hero-title">
                    Welcome to <span className="brand-gradient">Colorify</span> 🎨
                  </h1>
                  <p className="hero-subtitle">
                    Your Ultimate Color Palette Generator & Design Tool
                  </p>
                  <p className="hero-description">
                    Discover, create, and perfect color combinations for your projects with our 
                    comprehensive suite of color tools powered by advanced algorithms and AI insights.
                  </p>
                  <div className="hero-buttons">
                    <button 
                      onClick={() => setActiveSection('hex-finder')}
                      className="btn btn-primary hero-btn"
                    >
                      🎨 Start Creating
                    </button>
                    <button 
                      onClick={() => setActiveSection('templates')}
                      className="btn btn-secondary hero-btn"
                    >
                      📐 Browse Templates
                    </button>
                  </div>
                </div>
                <div className="hero-visual">
                  <div className="color-showcase">
                    <div className="color-circle" style={{backgroundColor: '#FF6B6B'}}></div>
                    <div className="color-circle" style={{backgroundColor: '#4ECDC4'}}></div>
                    <div className="color-circle" style={{backgroundColor: '#45B7D1'}}></div>
                    <div className="color-circle" style={{backgroundColor: '#96CEB4'}}></div>
                    <div className="color-circle" style={{backgroundColor: '#FFEAA7'}}></div>
                    <div className="color-circle" style={{backgroundColor: '#DDA0DD'}}></div>
                  </div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section className="about-section">
              <div className="section-container">
                <h2 className="section-title">What is Colorify?</h2>
                <p className="section-description">
                  Colorify is a comprehensive color management platform designed for designers, developers, 
                  and creative professionals. Whether you're building a website, designing a brand, or 
                  creating digital art, Colorify provides the tools you need to work with colors effectively.
                </p>
                
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">🎯</div>
                    <h3 className="feature-title">Precision Tools</h3>
                    <p className="feature-description">
                      Advanced HEX validation, RGB conversion, and color extraction from images 
                      with mathematical precision.
                    </p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">🤖</div>
                    <h3 className="feature-title">AI-Powered</h3>
                    <p className="feature-description">
                      Intelligent color suggestions based on color theory, psychology, 
                      and current design trends.
                    </p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">📚</div>
                    <h3 className="feature-title">Template Library</h3>
                    <p className="feature-description">
                      Curated collection of professional color palettes for various 
                      industries and design styles.
                    </p>
                  </div>
                  
                  <div className="feature-card">
                    <div className="feature-icon">📱</div>
                    <h3 className="feature-title">Camera Integration</h3>
                    <p className="feature-description">
                      Extract colors directly from your camera or uploaded images 
                      to create custom palettes.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tools Section */}
            <section className="tools-section">
              <div className="section-container">
                <h2 className="section-title">Powerful Tools at Your Fingertips</h2>
                
                <div className="tools-grid">
                  <div className="tool-card" onClick={() => setActiveSection('hex-finder')}>
                    <div className="tool-header">
                      <div className="tool-icon">🎨</div>
                      <h3 className="tool-title">HEX Finder</h3>
                    </div>
                    <div className="tool-content">
                      <p className="tool-description">
                        Complete color workspace for HEX validation, RGB conversion, 
                        palette generation, and image color extraction.
                      </p>
                      <div className="tool-features">
                        <span className="tool-feature">✓ HEX Validation</span>
                        <span className="tool-feature">✓ RGB Conversion</span>
                        <span className="tool-feature">✓ Random Colors</span>
                        <span className="tool-feature">✓ Image Analysis</span>
                        <span className="tool-feature">✓ Camera Support</span>
                      </div>
                    </div>
                    <div className="tool-action">
                      <span className="action-text">Try HEX Finder →</span>
                    </div>
                  </div>

                  <div className="tool-card" onClick={() => setActiveSection('templates')}>
                    <div className="tool-header">
                      <div className="tool-icon">📐</div>
                      <h3 className="tool-title">Color Templates</h3>
                    </div>
                    <div className="tool-content">
                      <p className="tool-description">
                        Professionally curated color palettes organized by category, 
                        industry, and design style for instant inspiration.
                      </p>
                      <div className="tool-features">
                        <span className="tool-feature">✓ 50+ Templates</span>
                        <span className="tool-feature">✓ Category Filters</span>
                        <span className="tool-feature">✓ Usage Guidelines</span>
                        <span className="tool-feature">✓ Download Options</span>
                        <span className="tool-feature">✓ Quick Copy</span>
                      </div>
                    </div>
                    <div className="tool-action">
                      <span className="action-text">Browse Templates →</span>
                    </div>
                  </div>

                  <div className="tool-card" onClick={() => setActiveSection('suggestions')}>
                    <div className="tool-header">
                      <div className="tool-icon">🤖</div>
                      <h3 className="tool-title">AI Suggestions</h3>
                    </div>
                    <div className="tool-content">
                      <p className="tool-description">
                        Smart color recommendations based on psychology, trends, 
                        accessibility guidelines, and color harmony principles.
                      </p>
                      <div className="tool-features">
                        <span className="tool-feature">✓ Trend Analysis</span>
                        <span className="tool-feature">✓ Color Psychology</span>
                        <span className="tool-feature">✓ Accessibility Check</span>
                        <span className="tool-feature">✓ Industry Standards</span>
                        <span className="tool-feature">✓ Confidence Scores</span>
                      </div>
                    </div>
                    <div className="tool-action">
                      <span className="action-text">Get Suggestions →</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Use Cases Section */}
            <section className="use-cases-section">
              <div className="section-container">
                <h2 className="section-title">Perfect for Every Project</h2>
                
                <div className="use-cases-grid">
                  <div className="use-case">
                    <div className="use-case-icon">💻</div>
                    <h3 className="use-case-title">Web Development</h3>
                    <p className="use-case-description">
                      Create consistent color schemes for websites, validate HEX codes, 
                      and ensure accessibility compliance.
                    </p>
                  </div>
                  
                  <div className="use-case">
                    <div className="use-case-icon">🎨</div>
                    <h3 className="use-case-title">Graphic Design</h3>
                    <p className="use-case-description">
                      Discover trending color palettes, extract colors from inspiration images, 
                      and create mood boards.
                    </p>
                  </div>
                  
                  <div className="use-case">
                    <div className="use-case-icon">🏢</div>
                    <h3 className="use-case-title">Brand Identity</h3>
                    <p className="use-case-description">
                      Develop brand color systems using psychology-based suggestions 
                      and industry-standard palettes.
                    </p>
                  </div>
                  
                  <div className="use-case">
                    <div className="use-case-icon">📱</div>
                    <h3 className="use-case-title">UI/UX Design</h3>
                    <p className="use-case-description">
                      Generate accessible color schemes, test contrast ratios, 
                      and create user-friendly interfaces.
                    </p>
                  </div>
                  
                  <div className="use-case">
                    <div className="use-case-icon">🖼️</div>
                    <h3 className="use-case-title">Digital Art</h3>
                    <p className="use-case-description">
                      Extract palettes from reference images, explore color harmonies, 
                      and discover new combinations.
                    </p>
                  </div>
                  
                  <div className="use-case">
                    <div className="use-case-icon">🎬</div>
                    <h3 className="use-case-title">Content Creation</h3>
                    <p className="use-case-description">
                      Create cohesive color themes for videos, social media, 
                      and marketing materials.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Statistics Section */}
            <section className="stats-section">
              <div className="section-container">
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">50+</div>
                    <div className="stat-label">Color Templates</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">6</div>
                    <div className="stat-label">AI Categories</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">∞</div>
                    <div className="stat-label">Color Combinations</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">100%</div>
                    <div className="stat-label">Accessible</div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
              <div className="section-container">
                <div className="cta-content">
                  <h2 className="cta-title">Ready to Transform Your Color Workflow?</h2>
                  <p className="cta-description">
                    Join thousands of designers and developers who trust Colorify 
                    for their color needs. Start creating stunning palettes today.
                  </p>
                  <div className="cta-buttons">
                    <button 
                      onClick={() => setActiveSection('hex-finder')}
                      className="btn btn-primary cta-btn"
                    >
                      🚀 Start Creating Now
                    </button>
                    <button 
                      onClick={() => setActiveSection('suggestions')}
                      className="btn btn-accent cta-btn"
                    >
                      🤖 Try AI Suggestions
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      {renderContent()}
    </div>
  );
}

export default App;