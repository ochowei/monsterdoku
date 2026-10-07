/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { GameScreen } from './types/gameFlow';
import { HomeScreen } from './screens/HomeScreen';
import { CampaignScreen } from './screens/CampaignScreen';
import { EndlessScreen } from './screens/EndlessScreen';
import { sounds } from './utils/audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('home');
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMute = useCallback(() => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sounds.setMuted(nextMuted);
  }, [isMuted]);

  if (currentScreen === 'campaign') {
    return (
      <CampaignScreen
        onBackToHome={() => {
          sounds.playClear();
          setCurrentScreen('home');
        }}
      />
    );
  }

  if (currentScreen === 'endless') {
    return (
      <EndlessScreen
        onBackToHome={() => {
          sounds.playClear();
          setCurrentScreen('home');
        }}
        onGoToCampaign={() => {
          sounds.playTap();
          setCurrentScreen('campaign');
        }}
      />
    );
  }

  // Default: 'home'
  return (
    <HomeScreen
      onSelectScreen={(screen) => {
        setCurrentScreen(screen);
      }}
      isMuted={isMuted}
      onToggleMute={handleToggleMute}
    />
  );
}
