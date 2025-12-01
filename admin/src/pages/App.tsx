import { Page } from '@strapi/strapi/admin';
import { Route, Routes } from 'react-router-dom';

import { ThemePresetsProvider } from '../contexts/theme-presets';
import { HomePage } from './HomePage';

const App = () => {
  return (
    <ThemePresetsProvider>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="*" element={<Page.Error />} />
      </Routes>
    </ThemePresetsProvider>
  );
};

export { App };
