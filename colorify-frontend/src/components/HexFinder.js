import React, { useState, useEffect, useRef } from 'react';
import './HexFinder.css';

const HexFinder = () => {
  const [hexInput, setHexInput] = useState('');
  const [currentColor, setCurrentColor] = useState('#3B82F6');
  const [rgbInput, setRgbInput] = useState({ r: 59, g: 130, b: 246 });
  const [palette, setPalette] = useState([]);
  const [validationMessage, setValidationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Image processing states
  const [extractedColors, setExtractedColors] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [cameraError, setCameraError] = useState('');
  const [cameraReady, setCameraReady] = useState(false);
  
  // Refs
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const API_BASE_URL = 'http://localhost:8080/api/hex';
  const IMAGE_API_BASE_URL = 'http://localhost:8080/api/image';

  // Existing color functions remain the same...
  const generateRandomColor = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/random`);
      const data = await response.json();
      setCurrentColor(data.hex);
      setHexInput(data.hex);
      setRgbInput(data.rgb);
      setValidationMessage('Random color generated!');
    } catch (error) {
      setValidationMessage('Error generating random color');
    }
    setIsLoading(false);
  };

  const validateHex = async (hex) => {
    if (!hex) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/validate/${hex.replace('#', '')}`);
      const data = await response.json();
      
      if (data.valid) {
        setCurrentColor(data.hex);
        setRgbInput(data.rgb);
        setValidationMessage('Valid HEX color!');
      } else {
        setValidationMessage(data.message);
      }
    } catch (error) {
      setValidationMessage('Error validating color');
    }
  };

  const convertRgbToHex = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rgbInput),
      });
      const data = await response.json();
      
      if (data.hex) {
        setCurrentColor(data.hex);
        setHexInput(data.hex);
        setValidationMessage('RGB converted to HEX!');
      } else {
        setValidationMessage(data.error || 'Error converting RGB');
      }
    } catch (error) {
      setValidationMessage('Error converting RGB to HEX');
    }
    setIsLoading(false);
  };

  const generatePalette = async () => {
    if (!currentColor) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/palette/${currentColor.replace('#', '')}`);
      const data = await response.json();
      
      if (data.palette) {
        setPalette(data.palette);
        setValidationMessage('Palette generated!');
      } else {
        setValidationMessage(data.error || 'Error generating palette');
      }
    } catch (error) {
      setValidationMessage('Error generating palette');
    }
    setIsLoading(false);
  };

  // Image processing functions
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = async (file) => {
    setIsLoading(true);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Extract colors
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${IMAGE_API_BASE_URL}/extract-colors`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.colors) {
        setExtractedColors(data.colors);
        setValidationMessage(`Extracted ${data.colors.length} dominant colors from image!`);
        
        // Set the most dominant color as current color
        if (data.colors.length > 0) {
          const dominantColor = data.colors[0];
          setCurrentColor(dominantColor.hex);
          setHexInput(dominantColor.hex);
          setRgbInput(dominantColor.rgb);
        }
      } else {
        setValidationMessage(data.error || 'Error extracting colors from image');
      }
    } catch (error) {
      setValidationMessage('Error processing image');
    }
    
    setIsLoading(false);
  };

  // IMPROVED CAMERA FUNCTIONS
  const openCamera = async () => {
    setCameraError('');
    setCameraReady(false);
    setIsCameraOpen(true);
    setValidationMessage('Requesting camera access...');
    
    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }

      // Request camera access with basic constraints
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });

      if (!stream) {
        throw new Error('Failed to get camera stream');
      }

      streamRef.current = stream;
      setValidationMessage('Camera access granted, setting up video...');

      // Wait for next frame to ensure video element is rendered
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          
          // Set up event handlers
          const handleVideoReady = () => {
            setCameraReady(true);
            setValidationMessage('Camera ready! Click capture to take a photo.');
            console.log('Video ready, dimensions:', videoRef.current.videoWidth, 'x', videoRef.current.videoHeight);
          };

          const handleVideoError = (error) => {
            console.error('Video error:', error);
            setCameraError('Error loading video stream');
            closeCamera();
          };

          // Remove any existing listeners
          videoRef.current.removeEventListener('loadedmetadata', handleVideoReady);
          videoRef.current.removeEventListener('canplay', handleVideoReady);
          videoRef.current.removeEventListener('error', handleVideoError);

          // Add event listeners
          videoRef.current.addEventListener('loadedmetadata', handleVideoReady, { once: true });
          videoRef.current.addEventListener('canplay', handleVideoReady, { once: true });
          videoRef.current.addEventListener('error', handleVideoError, { once: true });

          // Try to play the video
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log('Video started playing');
              })
              .catch((error) => {
                console.warn('Auto-play failed, but video might still work:', error);
                // Video might still be usable even if autoplay fails
                if (videoRef.current && videoRef.current.readyState >= 2) {
                  handleVideoReady();
                }
              });
          }

          // Fallback: Check if video is ready after a delay
          setTimeout(() => {
            if (videoRef.current && videoRef.current.readyState >= 2 && !cameraReady) {
              handleVideoReady();
            }
          }, 2000);

        } else {
          throw new Error('Video element not found after DOM update');
        }
      });

    } catch (error) {
      console.error('Camera access error:', error);
      let errorMessage = 'Error accessing camera: ';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Please allow camera permissions and try again.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No camera device found.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage += 'Camera not supported in this browser.';
      } else if (error.name === 'NotReadableError') {
        errorMessage += 'Camera is already in use by another application.';
      } else {
        errorMessage += error.message || 'Unknown error occurred.';
      }
      
      setCameraError(errorMessage);
      setValidationMessage(errorMessage);
      closeCamera();
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !cameraReady) {
      setValidationMessage('Camera not ready for capture. Please wait a moment.');
      return;
    }

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Check if video has valid dimensions
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        setValidationMessage('Video stream not ready. Please wait and try again.');
        return;
      }
      
      // Set canvas size to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to blob and process
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
          processImageFile(file);
          closeCamera();
          setValidationMessage('Photo captured successfully!');
        } else {
          setValidationMessage('Failed to capture photo. Please try again.');
        }
      }, 'image/jpeg', 0.9);
      
    } catch (error) {
      console.error('Capture error:', error);
      setValidationMessage('Error capturing photo: ' + error.message);
    }
  };

  const closeCamera = () => {
    // Stop all tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log('Stopped camera track:', track.kind);
      });
      streamRef.current = null;
    }
    
    // Clear video source
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      // Remove event listeners
      videoRef.current.removeEventListener('loadedmetadata', () => {});
      videoRef.current.removeEventListener('canplay', () => {});
      videoRef.current.removeEventListener('error', () => {});
    }
    
    // Reset states
    setIsCameraOpen(false);
    setCameraError('');
    setCameraReady(false);
    setValidationMessage('Camera closed');
  };

  const selectColorFromExtracted = (color) => {
    setCurrentColor(color.hex);
    setHexInput(color.hex);
    setRgbInput(color.rgb);
    setValidationMessage(`Selected color ${color.hex} from image!`);
  };

  const clearImage = () => {
    setImagePreview(null);
    setExtractedColors([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setValidationMessage('Image cleared');
  };

  const handleHexInputChange = (e) => {
    const value = e.target.value;
    setHexInput(value);
    
    if (value.length >= 6) {
      validateHex(value);
    }
  };

  const handleRgbInputChange = (color, value) => {
    const numValue = Math.min(255, Math.max(0, parseInt(value) || 0));
    setRgbInput(prev => ({ ...prev, [color]: numValue }));
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setValidationMessage(`Copied ${color} to clipboard!`);
  };

  useEffect(() => {
    generateRandomColor();
    
    // Cleanup camera stream on unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="hex-finder">
      <div className="hex-finder-container">
        <h1 className="hex-finder-title">HEX Color Finder</h1>
        
        {/* Color Display */}
        <div className="color-display">
          <div 
            className="color-preview" 
            style={{ backgroundColor: currentColor }}
            onClick={() => copyToClipboard(currentColor)}
            title="Click to copy"
          >
            <span className="color-text">{currentColor}</span>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="input-section">
          <label className="input-label">Extract Colors from Image</label>
          <div className="image-upload-container">
            <div className="upload-buttons">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden-file-input"
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className="btn btn-secondary">
                📁 Upload Image
              </label>
              <button 
                onClick={openCamera}
                className="btn btn-secondary"
                disabled={isCameraOpen}
              >
                📷 Open Camera
              </button>
              {(imagePreview || extractedColors.length > 0) && (
                <button 
                  onClick={clearImage}
                  className="btn btn-danger"
                >
                  🗑️ Clear
                </button>
              )}
            </div>
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="image-preview">
                <img 
                  src={imagePreview} 
                  alt="Uploaded" 
                  className="preview-image"
                />
              </div>
            )}
            
            {/* Camera Section */}
            {isCameraOpen && (
              <div className="camera-section">
                <div className="camera-container">
                  <div className="camera-box">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted
                      className="camera-video"
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        height: '300px',
                        backgroundColor: '#000',
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
                    />
                    {!cameraReady && (
                      <div className="camera-overlay">
                        <div className="loading-spinner"></div>
                        <p>Initializing camera...</p>
                      </div>
                    )}
                  </div>
                  
                  {cameraError && (
                    <div className="camera-error">
                      ❌ {cameraError}
                    </div>
                  )}
                </div>
                
                <div className="camera-controls">
                  <button 
                    onClick={capturePhoto} 
                    className="btn btn-primary"
                    disabled={!cameraReady}
                  >
                    📸 Capture Photo
                  </button>
                  <button 
                    onClick={closeCamera} 
                    className="btn btn-secondary"
                  >
                    ❌ Close Camera
                  </button>
                </div>
              </div>
            )}
            
            <canvas ref={canvasRef} className="hidden-canvas" />
          </div>
        </div>

        {/* Camera Error Display */}
        {cameraError && (
          <div className="input-section">
            <div className="camera-error-section">
              <h3>Camera Troubleshooting</h3>
              <p>{cameraError}</p>
              <div className="troubleshooting-steps">
                <h4>Try these steps:</h4>
                <ul>
                  <li>🔒 Click the camera icon in your browser's address bar and allow camera access</li>
                  <li>🔄 Refresh the page and try again</li>
                  <li>📱 Make sure no other app is using your camera</li>
                  <li>🌐 Use HTTPS or localhost (some browsers require secure connection)</li>
                  <li>🔧 Check your browser settings for camera permissions</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Extracted Colors */}
        {extractedColors.length > 0 && (
          <div className="input-section">
            <label className="input-label">Extracted Colors from Image</label>
            <div className="extracted-colors-grid">
              {extractedColors.map((color, index) => (
                <div 
                  key={index}
                  className="extracted-color"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => selectColorFromExtracted(color)}
                  title={`${color.hex} - ${color.percentage || 'Click to use'}`}
                >
                  <div className="extracted-color-info">
                    <span className="extracted-color-hex">{color.hex}</span>
                    {color.percentage && (
                      <span className="extracted-color-percentage">{color.percentage}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HEX Input */}
        <div className="input-section">
          <label className="input-label">HEX Color</label>
          <div className="input-group">
            <input
              type="text"
              value={hexInput}
              onChange={handleHexInputChange}
              placeholder="#FFFFFF"
              className="hex-input"
              maxLength="7"
            />
            <button 
              onClick={() => validateHex(hexInput)}
              className="btn btn-primary"
              disabled={isLoading}
            >
              Validate
            </button>
          </div>
        </div>

        {/* RGB Input */}
        <div className="input-section">
          <label className="input-label">RGB Values</label>
          <div className="rgb-inputs">
            <div className="rgb-input-group">
              <label>R</label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgbInput.r}
                onChange={(e) => handleRgbInputChange('r', e.target.value)}
                className="rgb-input"
              />
            </div>
            <div className="rgb-input-group">
              <label>G</label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgbInput.g}
                onChange={(e) => handleRgbInputChange('g', e.target.value)}
                className="rgb-input"
              />
            </div>
            <div className="rgb-input-group">
              <label>B</label>
              <input
                type="number"
                min="0"
                max="255"
                value={rgbInput.b}
                onChange={(e) => handleRgbInputChange('b', e.target.value)}
                className="rgb-input"
              />
            </div>
            <button 
              onClick={convertRgbToHex}
              className="btn btn-secondary"
              disabled={isLoading}
            >
              Convert
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            onClick={generateRandomColor}
            className="btn btn-accent"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Random Color'}
          </button>
          <button 
            onClick={generatePalette}
            className="btn btn-accent"
            disabled={isLoading}
          >
            Generate Palette
          </button>
        </div>

        {/* Validation Message */}
        {validationMessage && (
          <div className="validation-message">
            {validationMessage}
          </div>
        )}

        {/* Generated Palette */}
        {palette.length > 0 && (
          <div className="palette-section">
            <h3>Generated Palette</h3>
            <div className="palette-grid">
              {palette.map((color, index) => (
                <div 
                  key={index}
                  className="palette-color"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => copyToClipboard(color.hex)}
                  title={`${color.hex} - Click to copy`}
                >
                  <span className="palette-color-text">{color.hex}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HexFinder;