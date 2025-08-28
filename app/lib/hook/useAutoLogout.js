import { useEffect, useRef } from 'react';
import { AppState, PanResponder } from 'react-native';

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds

export const useAutoLogout = (onLogout) => {
  const timeoutRef = useRef(null);
  const appState = useRef(AppState.currentState);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(onLogout, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    // Listen for AppState changes
    const appStateSubscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has active now!');
        // App came to foreground, reset timeout
        resetTimeout();
      }
      else if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
        console.log('App has gone to the background or become inactive!');
       
      }
      appState.current = nextAppState;
    });

    // Initialize the timeout when the component mounts
    resetTimeout();

    // Set up PanResponder for touch activity
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => resetTimeout(),
    });

    // Clean up on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      appStateSubscription.remove();
    };
  }, [onLogout]);

  return PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => resetTimeout(),
  }).panHandlers;
};