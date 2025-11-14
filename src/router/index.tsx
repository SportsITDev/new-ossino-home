import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}