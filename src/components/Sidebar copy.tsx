import React from 'react';
import { Text, Spacer } from 'kitchn';

export const Sidebar: React.FC = () => {
  return (
    <div style={{ width: '16rem', position: 'fixed', top: 0, left: 0, height: '100vh', backgroundColor: '#111', padding: '1rem' }}>
      <Text as="h2" style={{ fontSize: '1.5rem', color: 'white', fontWeight: 'bold' }}>Music Player</Text>
      <Spacer />
      <Text as="p" style={{ color: 'gray' }}>Your playlist and settings will go here.</Text>
    </div>
  );
};
