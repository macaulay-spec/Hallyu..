import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export const TABS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'explore', label: 'Explore', icon: 'explore' },
  { id: 'communities', label: 'Communities', icon: 'communities' },
  { id: 'messages', label: 'Messages', icon: 'messages' },
  { id: 'profile', label: 'Profile', icon: 'profile' },
];

const NavCtx = createContext(null);

export function NavProvider({ children }) {
  const [tab, setTabState] = useState('home');
  const [stack, setStack] = useState([]); // [{name, params}]

  const push = useCallback((name, params = {}) => {
    setStack(s => [...s, { name, params }]);
    window.history.pushState({ depth: s => undefined }, '');
  }, []);

  const pop = useCallback(() => {
    setStack(s => {
      if (s.length === 0) return s;
      return s.slice(0, -1);
    });
  }, []);

  const replace = useCallback((name, params = {}) => {
    setStack(s => [...s.slice(0, -1), { name, params }]);
  }, []);

  const reset = useCallback((name, params = {}) => {
    setStack([{ name, params }]);
    window.history.pushState({}, '');
  }, []);

  const setTab = useCallback((t) => {
    setTabState(t);
    setStack([]);
  }, []);

  useEffect(() => {
    const onPop = () => setStack(s => (s.length ? s.slice(0, -1) : s));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <NavCtx.Provider value={{ tab, setTab, stack, push, pop, replace, reset }}>
      {children}
    </NavCtx.Provider>
  );
}

export const useNav = () => useContext(NavCtx);
