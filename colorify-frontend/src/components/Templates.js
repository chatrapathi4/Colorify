import React, { useState, useEffect } from 'react';
import './Templates.css';

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // Initialize with predefined templates
    const predefinedTemplates = [
      {
        id: 1,
        name: 'Ocean Breeze',
        category: 'nature',
        colors: ['#006994', '#13A5B7', '#7FB069', '#E6F2FF', '#B8E6FF'],
        description: 'Calming ocean-inspired palette',
        tags: ['blue', 'green', 'calm', 'nature'],
        usage: 'Perfect for wellness apps, spa websites, and nature blogs'
      },
      {
        id: 2,
        name: 'Sunset Glow',
        category: 'nature',
        colors: ['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5', '#4ECDC4'],
        description: 'Warm sunset colors',
        tags: ['orange', 'yellow', 'warm', 'vibrant'],
        usage: 'Great for lifestyle brands, photography portfolios, and creative agencies'
      },
      {
        id: 3,
        name: 'Modern Corporate',
        category: 'business',
        colors: ['#2C3E50', '#3498DB', '#95A5A6', '#ECF0F1', '#FFFFFF'],
        description: 'Professional business palette',
        tags: ['blue', 'gray', 'professional', 'clean'],
        usage: 'Ideal for corporate websites, financial services, and business applications'
      },
      {
        id: 4,
        name: 'Tech Startup',
        category: 'business',
        colors: ['#1A1A2E', '#16213E', '#0F3460', '#533483', '#E94560'],
        description: 'Modern tech-focused colors',
        tags: ['dark', 'purple', 'modern', 'tech'],
        usage: 'Perfect for tech startups, SaaS platforms, and mobile apps'
      },
      {
        id: 5,
        name: 'Minimalist',
        category: 'design',
        colors: ['#000000', '#333333', '#666666', '#F5F5F5', '#FFFFFF'],
        description: 'Clean minimalist design',
        tags: ['black', 'white', 'minimal', 'clean'],
        usage: 'Excellent for portfolios, fashion brands, and architecture websites'
      },
      {
        id: 6,
        name: 'Pastel Dreams',
        category: 'design',
        colors: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'],
        description: 'Soft pastel colors',
        tags: ['pastel', 'soft', 'feminine', 'gentle'],
        usage: 'Perfect for beauty brands, baby products, and lifestyle blogs'
      },
      {
        id: 7,
        name: 'Vibrant Energy',
        category: 'creative',
        colors: ['#FF0080', '#FF8C00', '#32CD32', '#1E90FF', '#9932CC'],
        description: 'High-energy vibrant palette',
        tags: ['bright', 'energetic', 'bold', 'creative'],
        usage: 'Great for gaming, entertainment, and youth-oriented brands'
      },
      {
        id: 8,
        name: 'Earth Tones',
        category: 'nature',
        colors: ['#8B4513', '#CD853F', '#F4A460', '#DEB887', '#FFEFD5'],
        description: 'Natural earth-inspired colors',
        tags: ['brown', 'earth', 'natural', 'organic'],
        usage: 'Ideal for organic products, outdoor brands, and rustic designs'
      },
      {
        id: 9,
        name: 'Retro Vintage',
        category: 'creative',
        colors: ['#D2691E', '#CD5C5C', '#DAA520', '#BC8F8F', '#F5DEB3'],
        description: 'Nostalgic retro colors',
        tags: ['vintage', 'retro', 'warm', 'nostalgic'],
        usage: 'Perfect for vintage brands, cafes, and creative projects'
      },
      {
        id: 10,
        name: 'Monochrome Blue',
        category: 'design',
        colors: ['#0A1B3D', '#1F4E79', '#3A7BD5', '#87CEEB', '#E6F3FF'],
        description: 'Elegant blue monochrome',
        tags: ['blue', 'monochrome', 'elegant', 'professional'],
        usage: 'Excellent for healthcare, education, and professional services'
      }
    ];

    setTemplates(predefinedTemplates);
  }, []);

  const categories = [
    { id: 'all', name: 'All Templates', icon: '🎨' },
    { id: 'nature', name: 'Nature', icon: '🌿' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'design', name: 'Design', icon: '✨' },
    { id: 'creative', name: 'Creative', icon: '🎭' }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const copyPalette = (colors) => {
    const paletteText = colors.join(', ');
    copyToClipboard(paletteText);
  };

  const downloadPalette = (template) => {
    const data = {
      name: template.name,
      colors: template.colors,
      description: template.description,
      usage: template.usage
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.replace(/\s+/g, '_')}_palette.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="templates">
      <div className="templates-container">
        <header className="templates-header">
          <h1 className="templates-title">Color Templates</h1>
          <p className="templates-subtitle">
            Discover beautiful, ready-to-use color palettes for your projects
          </p>
        </header>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="templates-grid">
          {filteredTemplates.map(template => (
            <div key={template.id} className="template-card">
              <div className="template-header">
                <h3 className="template-name">{template.name}</h3>
                <span className="template-category">{template.category}</span>
              </div>
              
              <div className="color-palette">
                {template.colors.map((color, index) => (
                  <div
                    key={index}
                    className="color-swatch"
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color)}
                    title={`${color} - Click to copy`}
                  >
                    <span className="color-code">{color}</span>
                  </div>
                ))}
              </div>

              <p className="template-description">{template.description}</p>
              
              <div className="template-tags">
                {template.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>

              <div className="template-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => copyPalette(template.colors)}
                  title="Copy all colors"
                >
                  📋 Copy Palette
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => setSelectedTemplate(template)}
                  title="View details"
                >
                  👁️ View Details
                </button>
                <button 
                  className="btn btn-accent"
                  onClick={() => downloadPalette(template)}
                  title="Download palette"
                >
                  💾 Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="empty-state">
            <h3>No templates found</h3>
            <p>Try selecting a different category.</p>
          </div>
        )}

        {/* Template Detail Modal */}
        {selectedTemplate && (
          <div className="modal-overlay" onClick={() => setSelectedTemplate(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{selectedTemplate.name}</h2>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedTemplate(null)}
                >
                  ✕
                </button>
              </div>
              
              <div className="modal-body">
                <div className="large-color-palette">
                  {selectedTemplate.colors.map((color, index) => (
                    <div
                      key={index}
                      className="large-color-swatch"
                      style={{ backgroundColor: color }}
                      onClick={() => copyToClipboard(color)}
                    >
                      <span className="large-color-code">{color}</span>
                    </div>
                  ))}
                </div>
                
                <div className="template-details">
                  <h3>Description</h3>
                  <p>{selectedTemplate.description}</p>
                  
                  <h3>Best Used For</h3>
                  <p>{selectedTemplate.usage}</p>
                  
                  <h3>Tags</h3>
                  <div className="template-tags">
                    {selectedTemplate.tags.map(tag => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary"
                  onClick={() => copyPalette(selectedTemplate.colors)}
                >
                  📋 Copy All Colors
                </button>
                <button 
                  className="btn btn-accent"
                  onClick={() => downloadPalette(selectedTemplate)}
                >
                  💾 Download Palette
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;