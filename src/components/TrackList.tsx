import React from 'react';
import { Text, Container, Spacer } from 'kitchn';
import { Track } from '../types/music';

interface TrackListProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
}

export const TrackList: React.FC<TrackListProps> = ({ tracks, onTrackSelect }) => {
  return (
    <Container>
      {tracks.map((track) => (
        <div
          key={track.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
            cursor: 'pointer',
            backgroundColor: '#333',
            padding: '0.5rem',
            borderRadius: '0.5rem',
          }}
          onClick={() => onTrackSelect(track)}
        >
          <img
            src={track.albumArt}
            alt={track.title}
            style={{ width: '50px', height: '50px', marginRight: '1rem', borderRadius: '0.25rem' }}
          />
          <Text as="p" style={{ color: 'white', fontSize: '1rem' }}>
            {track.title} - {track.artist}
          </Text>
        </div>
      ))}
      <Spacer />
    </Container>
  );
};
