import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Player } from './components/Player';
import { TrackList } from './components/TrackList';
import { Track } from './types/music';
import { Container, Spacer, Text } from 'kitchn';
import goosebumpsCover from './assets/cover/goosebumps.jpg';
import StillDreCover from './assets/cover/still_dre.jpg';
import LucidDreamsCover from './assets/cover/lucidDreams.png';
import UnforgettableCover from './assets/cover/unforgettable.jpg';
import stillDreAudio from './assets/music/still_dre.mp3';
import lucidDreamsAudio from './assets/music/lucidDreams.mp3';
import unforgettableAudio from './assets/music/unforgettable.mp3';
import goosebumpsAudio from './assets/music/goosebumps.mp3';




// Exemple de pistes avec des fichiers locaux pour albumArt et audioFile
const SAMPLE_TRACKS: Track[] = [
  {
    id: '1',
    title: "Still Dre",
    artist: 'Dr. Dre Ft. Snoop Dogg',
    albumArt: StillDreCover, 
    source: 'local',
    audioFile: stillDreAudio, 
  },
  {
    id: '2',
    title: 'Lucid Dreams',
    artist: 'Juice WRLD',
    albumArt: LucidDreamsCover,
    source: 'local',
    audioFile: lucidDreamsAudio,
  },
  {
    id: '3',
    title: 'Unforgettable',
    artist: 'French Montana Ft. Swae Lee',
    albumArt: UnforgettableCover,
    source: 'local',
    audioFile: unforgettableAudio,
  },
  {
    id: '4',
    title: 'Goosebumps',
    artist: 'Travis Scott',
    albumArt: goosebumpsCover,
    source: 'local',
    audioFile: goosebumpsAudio,
  },
];

function App() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = SAMPLE_TRACKS.findIndex(track => track.id === currentTrack?.id);
    const nextTrack = SAMPLE_TRACKS[(currentIndex + 1) % SAMPLE_TRACKS.length];
    setCurrentTrack(nextTrack);
  };

  const handlePrevious = () => {
    const currentIndex = SAMPLE_TRACKS.findIndex(track => track.id === currentTrack?.id);
    const previousTrack = SAMPLE_TRACKS[(currentIndex - 1 + SAMPLE_TRACKS.length) % SAMPLE_TRACKS.length];
    setCurrentTrack(previousTrack);
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, #1a1a1a, #000)', minHeight: '100vh', color: 'white' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Container style={{ marginLeft: '16rem', padding: '2rem', paddingBottom: '8rem' }}>
        <Text as="h1" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Featured Tracks
        </Text>

        <TrackList tracks={SAMPLE_TRACKS} onTrackSelect={handleTrackSelect} />
        <Spacer />
      </Container>

      {/* Player */}
      <Player
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}

export default App;
