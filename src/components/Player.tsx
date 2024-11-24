import React, { useRef, useEffect, useState } from 'react';
import { Button, Text } from 'kitchn';
import { Track } from '../types/music';

interface PlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const Player: React.FC<PlayerProps> = ({ currentTrack, isPlaying, onPlayPause, onNext, onPrevious }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Gérer la lecture/pause et le changement de piste
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error('Error playing audio:', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  // Mettre à jour le temps actuel et la durée totale
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const setAudioDuration = () => setDuration(audio.duration);

      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', setAudioDuration);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', setAudioDuration);
      };
    }
  }, []);

  // Passer automatiquement à la piste suivante lorsque la piste actuelle est terminée
  const handleEnded = () => {
    onNext();
  };

  // Gérer la barre de progression
  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = Number(event.target.value);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Formater le temps en mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#222',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
      }}
    >
      {/* Informations de la piste */}
      <div>
        <Text as="p" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
          {currentTrack ? `${currentTrack.title} - ${currentTrack.artist}` : 'No track selected'}
        </Text>
        {/* Timer et barre de progression */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Text as="span" style={{ fontSize: '0.9rem' }}>
            {formatTime(currentTime)}
          </Text>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleProgressChange}
            style={{ width: '200px' }}
          />
          <Text as="span" style={{ fontSize: '0.9rem' }}>
            {formatTime(duration)}
          </Text>
        </div>
      </div>

      {/* Contrôles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Button onClick={onPrevious} size="small" style={{ marginRight: '0.5rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M4 2v20h-2v-20h2zm18 0l-16 10 16 10v-20z" />
          </svg>
        </Button>
        <Button onClick={onPlayPause} size="small" style={{ marginRight: '0.5rem' }}>
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M3 22v-20l18 10-18 10z" />
            </svg>
          )}
        </Button>
        <Button onClick={onNext} size="small">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M4 2v20h-2v-20h2zm18 0l-16 10 16 10v-20z" transform="scale(-1, 1) translate(-24, 0)" />
          </svg>
        </Button>
      </div>

      {/* Élément audio invisible */}
      <audio
        ref={audioRef}
        src={currentTrack?.audioFile || undefined}
        onEnded={handleEnded} // Appelé lorsque la piste se termine
      />
    </div>
  );
};
