import React, { useState, useEffect } from 'react';
import './Suggestions.css';

const Suggestions = () => {
  const [selectedType, setSelectedType] = useState('trends');
  const [selectedColor, setSelectedColor] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    style: 'modern',
    mood: 'calm',
    industry: 'tech'
  });

  useEffect(() => {
    loadSuggestions();
  }, [selectedType, userPreferences]);

  const suggestionTypes = [
    { id: 'trends', name: 'Color Trends', icon: '📈', description: 'Latest color trends for 2024' },
    { id: 'harmony', name: 'Color Harmony', icon: '🎨', description: 'Scientifically pleasing color combinations' },
    { id: 'psychology', name: 'Color Psychology', icon: '🧠', description: 'Colors that evoke specific emotions' },
    { id: 'accessibility', name: 'Accessibility', icon: '♿', description: 'WCAG compliant color combinations' },
    { id: 'industry', name: 'Industry Standards', icon: '🏢', description: 'Colors popular in specific industries' },
    { id: 'seasonal', name: 'Seasonal Colors', icon: '🍂', description: 'Colors for different seasons and occasions' }
  ];

  const loadSuggestions = () => {
    setIsLoading(true);
    
    // Simulate API call - in real app, this would fetch from backend
    setTimeout(() => {
      const mockSuggestions = generateMockSuggestions(selectedType, userPreferences);
      setSuggestions(mockSuggestions);
      setIsLoading(false);
    }, 1000);
  };

  const generateMockSuggestions = (type, preferences) => {
    const suggestionData = {
      trends: [
        {
          id: 1,
          title: 'Digital Lime',
          colors: ['#32FF32', '#7CFC00', '#ADFF2F', '#9AFF9A', '#98FB98'],
          description: 'Vibrant green trending in digital design for 2024',
          reason: 'Popular in tech and sustainability brands',
          confidence: 95,
          tags: ['tech', 'modern', 'fresh'],
          usage: 'Perfect for app interfaces and modern websites'
        },
        {
          id: 2,
          title: 'Cosmic Purple',
          colors: ['#6A0DAD', '#8A2BE2', '#9370DB', '#BA55D3', '#DDA0DD'],
          description: 'Deep purple gaining popularity in luxury brands',
          reason: 'Associated with innovation and premium quality',
          confidence: 88,
          tags: ['luxury', 'premium', 'innovative'],
          usage: 'Ideal for luxury products and creative agencies'
        },
        {
          id: 3,
          title: 'Warm Terracotta',
          colors: ['#E2725B', '#CD853F', '#D2691E', '#F4A460', '#DEB887'],
          description: 'Earthy terracotta tones making a comeback',
          reason: 'Trending in interior design and lifestyle brands',
          confidence: 82,
          tags: ['earthy', 'warm', 'natural'],
          usage: 'Great for lifestyle and home decor brands'
        }
      ],
      harmony: [
        {
          id: 4,
          title: 'Complementary Balance',
          colors: ['#FF6B35', '#359AFF', '#FFE5D9', '#D9EFFF', '#FFFFFF'],
          description: 'Perfect complementary color relationship',
          reason: 'Creates visual tension and attracts attention',
          confidence: 100,
          tags: ['balanced', 'contrasting', 'dynamic'],
          usage: 'Excellent for call-to-action buttons and highlights'
        },
        {
          id: 5,
          title: 'Analogous Serenity',
          colors: ['#4A90E2', '#7B68EE', '#9370DB', '#C8E6C9', '#E8F5E8'],
          description: 'Harmonious blues and purples with nature accents',
          reason: 'Creates a calming and cohesive visual experience',
          confidence: 94,
          tags: ['calm', 'harmonious', 'soothing'],
          usage: 'Perfect for wellness apps and healthcare websites'
        },
        {
          id: 6,
          title: 'Triadic Energy',
          colors: ['#FF4136', '#FFDC00', '#0074D9', '#FFE6E6', '#FFF8DC'],
          description: 'Vibrant triadic color scheme for high energy',
          reason: 'Balanced contrast with maximum visual impact',
          confidence: 87,
          tags: ['energetic', 'vibrant', 'playful'],
          usage: 'Great for gaming, sports, and entertainment brands'
        }
      ],
      psychology: [
        {
          id: 7,
          title: 'Trust & Reliability',
          colors: ['#1E40AF', '#3B82F6', '#60A5FA', '#DBEAFE', '#F0F9FF'],
          description: 'Blues that inspire trust and professionalism',
          reason: 'Psychologically associated with stability and trust',
          confidence: 96,
          tags: ['trustworthy', 'professional', 'calm'],
          usage: 'Ideal for financial services and corporate websites'
        },
        {
          id: 8,
          title: 'Energy & Appetite',
          colors: ['#DC2626', '#EF4444', '#F87171', '#FEE2E2', '#FEF2F2'],
          description: 'Reds that stimulate appetite and urgency',
          reason: 'Known to increase heart rate and create urgency',
          confidence: 91,
          tags: ['energetic', 'urgent', 'appetizing'],
          usage: 'Perfect for food delivery apps and sale banners'
        },
        {
          id: 9,
          title: 'Growth & Harmony',
          colors: ['#059669', '#10B981', '#34D399', '#D1FAE5', '#ECFDF5'],
          description: 'Greens that represent growth and balance',
          reason: 'Associated with nature, growth, and prosperity',
          confidence: 89,
          tags: ['natural', 'growing', 'balanced'],
          usage: 'Excellent for environmental and finance apps'
        }
      ],
      accessibility: [
        {
          id: 10,
          title: 'High Contrast Pro',
          colors: ['#000000', '#FFFFFF', '#1F2937', '#F9FAFB', '#6B7280'],
          description: 'Maximum accessibility with perfect contrast ratios',
          reason: 'Meets WCAG AAA standards for all text sizes',
          confidence: 100,
          tags: ['accessible', 'contrast', 'readable'],
          usage: 'Essential for government and educational websites'
        },
        {
          id: 11,
          title: 'Colorblind Friendly',
          colors: ['#0173B2', '#DE8F05', '#029E73', '#CC78BC', '#CA9161'],
          description: 'Colors distinguishable by all types of colorblindness',
          reason: 'Tested with deuteranopia and protanopia simulations',
          confidence: 95,
          tags: ['colorblind-safe', 'inclusive', 'universal'],
          usage: 'Important for data visualization and charts'
        }
      ],
      industry: [
        {
          id: 12,
          title: 'Tech Startup',
          colors: ['#667EEA', '#764BA2', '#F093FB', '#F5576C', '#4FACFE'],
          description: 'Modern gradients popular in tech companies',
          reason: 'Conveys innovation and forward-thinking',
          confidence: 92,
          tags: ['tech', 'innovative', 'modern'],
          usage: 'Perfect for SaaS platforms and mobile apps'
        },
        {
          id: 13,
          title: 'Healthcare Trust',
          colors: ['#0EA5E9', '#22C55E', '#FFFFFF', '#F0F9FF', '#ECFDF5'],
          description: 'Clean, trustworthy colors for healthcare',
          reason: 'Blues and greens inspire trust and healing',
          confidence: 94,
          tags: ['medical', 'clean', 'trustworthy'],
          usage: 'Ideal for medical apps and healthcare websites'
        }
      ],
      seasonal: [
        {
          id: 14,
          title: 'Spring Awakening',
          colors: ['#84CC16', '#EAB308', '#F97316', '#EC4899', '#8B5CF6'],
          description: 'Fresh, vibrant colors of spring renewal',
          reason: 'Captures the energy and growth of spring season',
          confidence: 88,
          tags: ['fresh', 'vibrant', 'renewal'],
          usage: 'Great for spring campaigns and lifestyle brands'
        },
        {
          id: 15,
          title: 'Autumn Warmth',
          colors: ['#B45309', '#DC2626', '#EAB308', '#16A34A', '#7C2D12'],
          description: 'Rich, warm colors inspired by fall foliage',
          reason: 'Evokes feelings of comfort and harvest',
          confidence: 90,
          tags: ['warm', 'cozy', 'harvest'],
          usage: 'Perfect for autumn promotions and cozy brands'
        }
      ]
    };

    return suggestionData[type] || [];
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const copyPalette = (colors) => {
    const paletteText = colors.join(', ');
    copyToClipboard(paletteText);
  };

  const downloadPalette = (suggestion) => {
    const data = {
      title: suggestion.title,
      colors: suggestion.colors,
      description: suggestion.description,
      reason: suggestion.reason,
      tags: suggestion.tags,
      confidence: suggestion.confidence
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${suggestion.title.replace(/\s+/g, '_')}_suggestion.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return '#10B981'; // Green
    if (confidence >= 75) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  return (
    <div className="suggestions">
      <div className="suggestions-container">
        <header className="suggestions-header">
          <h1 className="suggestions-title">AI Color Suggestions</h1>
          <p className="suggestions-subtitle">
            Get intelligent color recommendations based on trends, psychology, and best practices
          </p>
        </header>

        {/* User Preferences */}
        <div className="preferences-section">
          <h3 className="preferences-title">Customize Your Suggestions</h3>
          <div className="preferences-grid">
            <div className="preference-group">
              <label className="preference-label">Style</label>
              <select 
                value={userPreferences.style}
                onChange={(e) => setUserPreferences(prev => ({ ...prev, style: e.target.value }))}
                className="preference-select"
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="minimalist">Minimalist</option>
                <option value="bold">Bold</option>
                <option value="vintage">Vintage</option>
              </select>
            </div>
            <div className="preference-group">
              <label className="preference-label">Mood</label>
              <select 
                value={userPreferences.mood}
                onChange={(e) => setUserPreferences(prev => ({ ...prev, mood: e.target.value }))}
                className="preference-select"
              >
                <option value="calm">Calm</option>
                <option value="energetic">Energetic</option>
                <option value="professional">Professional</option>
                <option value="playful">Playful</option>
                <option value="luxurious">Luxurious</option>
              </select>
            </div>
            <div className="preference-group">
              <label className="preference-label">Industry</label>
              <select 
                value={userPreferences.industry}
                onChange={(e) => setUserPreferences(prev => ({ ...prev, industry: e.target.value }))}
                className="preference-select"
              >
                <option value="tech">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
                <option value="retail">Retail</option>
                <option value="creative">Creative</option>
              </select>
            </div>
          </div>
        </div>

        {/* Suggestion Types */}
        <div className="types-section">
          <div className="types-grid">
            {suggestionTypes.map(type => (
              <button
                key={type.id}
                className={`type-card ${selectedType === type.id ? 'active' : ''}`}
                onClick={() => setSelectedType(type.id)}
              >
                <span className="type-icon">{type.icon}</span>
                <h3 className="type-name">{type.name}</h3>
                <p className="type-description">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Suggestions Grid */}
        <div className="suggestions-content">
          {isLoading ? (
            <div className="loading-section">
              <div className="loading-spinner"></div>
              <p>Generating AI suggestions...</p>
            </div>
          ) : (
            <div className="suggestions-grid">
              {suggestions.map(suggestion => (
                <div key={suggestion.id} className="suggestion-card">
                  <div className="suggestion-header">
                    <div className="suggestion-title-area">
                      <h3 className="suggestion-title">{suggestion.title}</h3>
                      <div className="confidence-badge">
                        <span 
                          className="confidence-dot"
                          style={{ backgroundColor: getConfidenceColor(suggestion.confidence) }}
                        ></span>
                        {suggestion.confidence}% confidence
                      </div>
                    </div>
                  </div>
                  
                  <div className="color-palette">
                    {suggestion.colors.map((color, index) => (
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

                  <p className="suggestion-description">{suggestion.description}</p>
                  
                  <div className="suggestion-reason">
                    <strong>Why this works:</strong> {suggestion.reason}
                  </div>

                  <div className="suggestion-usage">
                    <strong>Best for:</strong> {suggestion.usage}
                  </div>
                  
                  <div className="suggestion-tags">
                    {suggestion.tags.map(tag => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>

                  <div className="suggestion-actions">
                    <button 
                      className="btn btn-secondary"
                      onClick={() => copyPalette(suggestion.colors)}
                      title="Copy all colors"
                    >
                      📋 Copy Colors
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setSelectedColor(suggestion)}
                      title="View details"
                    >
                      👁️ Analyze
                    </button>
                    <button 
                      className="btn btn-accent"
                      onClick={() => downloadPalette(suggestion)}
                      title="Download suggestion"
                    >
                      💾 Save
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {suggestions.length === 0 && !isLoading && (
            <div className="empty-state">
              <h3>No suggestions found</h3>
              <p>Try adjusting your preferences or selecting a different suggestion type.</p>
            </div>
          )}
        </div>

        {/* Color Analysis Modal */}
        {selectedColor && (
          <div className="modal-overlay" onClick={() => setSelectedColor(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{selectedColor.title} Analysis</h2>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedColor(null)}
                >
                  ✕
                </button>
              </div>
              
              <div className="modal-body">
                <div className="large-color-palette">
                  {selectedColor.colors.map((color, index) => (
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
                
                <div className="analysis-details">
                  <div className="analysis-section">
                    <h3>Color Psychology</h3>
                    <p>{selectedColor.description}</p>
                  </div>
                  
                  <div className="analysis-section">
                    <h3>Why This Works</h3>
                    <p>{selectedColor.reason}</p>
                  </div>
                  
                  <div className="analysis-section">
                    <h3>Usage Recommendations</h3>
                    <p>{selectedColor.usage}</p>
                  </div>

                  <div className="analysis-section">
                    <h3>Confidence Score</h3>
                    <div className="confidence-bar">
                      <div 
                        className="confidence-fill"
                        style={{ 
                          width: `${selectedColor.confidence}%`,
                          backgroundColor: getConfidenceColor(selectedColor.confidence)
                        }}
                      ></div>
                    </div>
                    <p>{selectedColor.confidence}% - Based on color theory, trends, and user data</p>
                  </div>
                  
                  <div className="analysis-section">
                    <h3>Tags</h3>
                    <div className="suggestion-tags">
                      {selectedColor.tags.map(tag => (
                        <span key={tag} className="tag">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary"
                  onClick={() => copyPalette(selectedColor.colors)}
                >
                  📋 Copy All Colors
                </button>
                <button 
                  className="btn btn-accent"
                  onClick={() => downloadPalette(selectedColor)}
                >
                  💾 Download Analysis
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Suggestions;