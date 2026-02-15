import React, { useState } from 'react';
import './MusicTherapy.css';

const MusicTherapy = () => {
  const [selectedMood, setSelectedMood] = useState('calm');

  const moodPlaylists = {
    calm: {
      name: 'Calm & Peaceful',
      emoji: '😌',
      color: '#68d391',
      description: 'Soothing melodies to help you relax and find inner peace',
      playlists: [
        {
          title: 'Meditation & Mindfulness',
          description: 'Gentle instrumental music for meditation and relaxation',
          youtubeUrl: 'https://www.youtube.com/watch?v=1ZYbU82GVz4',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u',
          duration: '2 hours'
        },
        {
          title: 'Nature Sounds & Ambient',
          description: 'Peaceful nature sounds mixed with ambient music',
          youtubeUrl: 'https://www.youtube.com/watch?v=eKFTSSKCzWA',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY',
          duration: '3 hours'
        },
        {
          title: 'Soft Piano Melodies',
          description: 'Beautiful piano compositions for relaxation',
          youtubeUrl: 'https://www.youtube.com/watch?v=M5QY2_8704o',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO',
          duration: '1.5 hours'
        }
      ]
    },
    happy: {
      name: 'Happy & Uplifting',
      emoji: '😊',
      color: '#f6e05e',
      description: 'Upbeat songs to boost your mood and energy',
      playlists: [
        {
          title: 'Feel-Good Pop Hits',
          description: 'Upbeat pop songs that will make you smile',
          youtubeUrl: 'https://www.youtube.com/watch?v=ZbZSe6N_BXs',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd',
          duration: '2.5 hours'
        },
        {
          title: 'Sunshine & Positivity',
          description: 'Bright, cheerful songs for a positive mindset',
          youtubeUrl: 'https://www.youtube.com/watch?v=y6Sxv-sUYtM',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC',
          duration: '2 hours'
        },
        {
          title: 'Dance & Energy',
          description: 'High-energy tracks to get you moving',
          youtubeUrl: 'https://www.youtube.com/watch?v=fNFzfwLM72c',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX0BcQWzuB7ZO',
          duration: '1.5 hours'
        }
      ]
    },
    sad: {
      name: 'Comfort & Healing',
      emoji: '😢',
      color: '#63b3ed',
      description: 'Gentle music to comfort you during difficult times',
      playlists: [
        {
          title: 'Emotional Healing',
          description: 'Soothing songs for emotional processing and healing',
          youtubeUrl: 'https://www.youtube.com/watch?v=hN_q-_nGv4U',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1',
          duration: '2 hours'
        },
        {
          title: 'Gentle Acoustic',
          description: 'Soft acoustic melodies for comfort',
          youtubeUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U',
          duration: '1.5 hours'
        },
        {
          title: 'Self-Care & Reflection',
          description: 'Music for self-compassion and gentle reflection',
          youtubeUrl: 'https://www.youtube.com/watch?v=lFcSrYw-ARY',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0',
          duration: '2.5 hours'
        }
      ]
    },
    anxious: {
      name: 'Anxiety Relief',
      emoji: '😰',
      color: '#a78bfa',
      description: 'Calming music to ease anxiety and promote relaxation',
      playlists: [
        {
          title: 'Breathing & Relaxation',
          description: 'Music synchronized with breathing exercises',
          youtubeUrl: 'https://www.youtube.com/watch?v=inpok4MKVLM',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWXe9gFZP0gtP',
          duration: '1 hour'
        },
        {
          title: 'Stress Relief Sounds',
          description: 'Calming sounds to reduce stress and anxiety',
          youtubeUrl: 'https://www.youtube.com/watch?v=UfcAVejslrU',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWZd79rJ6a7lp',
          duration: '3 hours'
        },
        {
          title: 'Mindful Moments',
          description: 'Gentle music for mindfulness and grounding',
          youtubeUrl: 'https://www.youtube.com/watch?v=M0r2VtWcvGw',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX9uKNf5jGX6m',
          duration: '2 hours'
        }
      ]
    },
    angry: {
      name: 'Release & Transform',
      emoji: '😠',
      color: '#fc8181',
      description: 'Music to help process and transform anger into positive energy',
      playlists: [
        {
          title: 'Emotional Release',
          description: 'Powerful music for healthy emotional expression',
          youtubeUrl: 'https://www.youtube.com/watch?v=Kb24RrHIbFk',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634',
          duration: '1.5 hours'
        },
        {
          title: 'Transformation & Growth',
          description: 'Empowering songs for turning anger into strength',
          youtubeUrl: 'https://www.youtube.com/watch?v=btPJPFnesV4',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6',
          duration: '2 hours'
        },
        {
          title: 'Calming After Storm',
          description: 'Gentle music to find peace after intense emotions',
          youtubeUrl: 'https://www.youtube.com/watch?v=lFcSrYw-ARY',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX0MLFaUdXnjA',
          duration: '2.5 hours'
        }
      ]
    },
    energetic: {
      name: 'Energy & Motivation',
      emoji: '⚡',
      color: '#fbb6ce',
      description: 'High-energy music to fuel your motivation and workouts',
      playlists: [
        {
          title: 'Workout Power',
          description: 'High-intensity music for exercise and movement',
          youtubeUrl: 'https://www.youtube.com/watch?v=fBYVlFXsEME',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP',
          duration: '1.5 hours'
        },
        {
          title: 'Motivation & Focus',
          description: 'Energizing tracks for productivity and focus',
          youtubeUrl: 'https://www.youtube.com/watch?v=09R8_2nJtjg',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX5trt9i14X7j',
          duration: '2 hours'
        },
        {
          title: 'Empowerment Anthems',
          description: 'Powerful songs to boost confidence and strength',
          youtubeUrl: 'https://www.youtube.com/watch?v=CevxZvSJLk8',
          spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4fpCWaHOned',
          duration: '2.5 hours'
        }
      ]
    }
  };

  const currentMood = moodPlaylists[selectedMood];

  return (
    <div className="music-therapy">
      <div className="container">
        <div className="music-header">
          <h1>Music Therapy</h1>
          <p>Discover curated playlists designed to support your emotional wellness journey</p>
        </div>

        {/* Mood Selection */}
        <div className="mood-selector">
          <h2>Choose Your Mood</h2>
          <div className="mood-buttons">
            {Object.entries(moodPlaylists).map(([key, mood]) => (
              <button
                key={key}
                className={`mood-btn ${selectedMood === key ? 'active' : ''}`}
                onClick={() => setSelectedMood(key)}
                style={{
                  borderColor: mood.color,
                  backgroundColor: selectedMood === key ? mood.color : 'transparent',
                  color: selectedMood === key ? 'white' : mood.color
                }}
              >
                <span className="mood-emoji">{mood.emoji}</span>
                <span className="mood-name">{mood.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Mood Display */}
        <div className="current-mood-section">
          <div className="mood-header" style={{ borderColor: currentMood.color }}>
            <div className="mood-title">
              <span className="mood-emoji-large">{currentMood.emoji}</span>
              <div>
                <h2>{currentMood.name}</h2>
                <p>{currentMood.description}</p>
              </div>
            </div>
          </div>

          {/* Playlists */}
          <div className="playlists-grid">
            {currentMood.playlists.map((playlist, index) => (
              <div key={index} className="playlist-card">
                <div className="playlist-header">
                  <h3>{playlist.title}</h3>
                  <span className="duration">{playlist.duration}</span>
                </div>
                
                <p className="playlist-description">{playlist.description}</p>
                
                <div className="playlist-links">
                  <a 
                    href={playlist.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="platform-link youtube"
                  >
                    <span className="platform-icon">🎥</span>
                    <span>YouTube</span>
                  </a>
                  
                  <a 
                    href={playlist.spotifyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="platform-link spotify"
                  >
                    <span className="platform-icon">🎵</span>
                    <span>Spotify</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Music Benefits Section */}
        <div className="benefits-section">
          <h2>Benefits of Music Therapy</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🧠</div>
              <h4>Mental Health</h4>
              <p>Music can reduce stress, anxiety, and depression while improving mood and emotional regulation.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">💤</div>
              <h4>Better Sleep</h4>
              <p>Calming music before bed can improve sleep quality and help you fall asleep faster.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">💪</div>
              <h4>Physical Wellness</h4>
              <p>Music can reduce pain perception, lower blood pressure, and boost immune function.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h4>Focus & Productivity</h4>
              <p>The right music can enhance concentration, memory, and cognitive performance.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">❤️</div>
              <h4>Emotional Processing</h4>
              <p>Music provides a safe space to process emotions and connect with your inner self.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h4>Social Connection</h4>
              <p>Shared musical experiences can strengthen relationships and reduce feelings of isolation.</p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="tips-section">
          <h2>Tips for Music Therapy</h2>
          <div className="tips-list">
            <div className="tip-item">
              <div className="tip-number">1</div>
              <div className="tip-content">
                <h4>Create a Comfortable Space</h4>
                <p>Find a quiet, comfortable place where you can listen without distractions. Use good quality headphones or speakers.</p>
              </div>
            </div>
            
            <div className="tip-item">
              <div className="tip-number">2</div>
              <div className="tip-content">
                <h4>Match Music to Your Needs</h4>
                <p>Choose music that aligns with your current emotional state or the mood you want to achieve.</p>
              </div>
            </div>
            
            <div className="tip-item">
              <div className="tip-number">3</div>
              <div className="tip-content">
                <h4>Practice Active Listening</h4>
                <p>Focus fully on the music. Notice the instruments, rhythms, and how the music makes you feel.</p>
              </div>
            </div>
            
            <div className="tip-item">
              <div className="tip-number">4</div>
              <div className="tip-content">
                <h4>Combine with Other Practices</h4>
                <p>Enhance the experience by combining music with meditation, journaling, or gentle movement.</p>
              </div>
            </div>
            
            <div className="tip-item">
              <div className="tip-number">5</div>
              <div className="tip-content">
                <h4>Be Consistent</h4>
                <p>Regular music therapy sessions, even just 10-15 minutes daily, can provide lasting benefits.</p>
              </div>
            </div>
            
            <div className="tip-item">
              <div className="tip-number">6</div>
              <div className="tip-content">
                <h4>Trust Your Preferences</h4>
                <p>Everyone responds differently to music. Trust your instincts and choose what feels right for you.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <div className="cta-card">
            <h2>Start Your Musical Wellness Journey</h2>
            <p>
              Music has the power to heal, inspire, and transform. Whether you're seeking calm, 
              energy, or emotional release, let music be your companion on the path to wellness.
            </p>
            <div className="cta-buttons">
              <button 
                onClick={() => setSelectedMood('calm')}
                className="btn btn-primary"
              >
                Start with Calm Music
              </button>
              <button 
                onClick={() => setSelectedMood('happy')}
                className="btn btn-outline"
              >
                Boost Your Mood
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicTherapy;