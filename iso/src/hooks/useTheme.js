import { useState, useEffect } from 'react';
import { Appearance } from 'react-native';

const useTheme = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => listener.remove();
  }, []);

  return theme;
};

export default useTheme;
