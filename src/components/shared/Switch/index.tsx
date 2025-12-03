import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from 'helpers/ui';

const commonStyle =
  'flex h-full w-1/2 cursor-pointer items-center justify-center bg-inherit text-center duration-300 text-white';

const Switcher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState('casino');

  useEffect(() => {
    if (location.pathname === '/sports') {
      setActive('sports');
    } else if (location.pathname === '/') {
      setActive('casino');
    }
  }, [location.pathname]);

  const handleSwitch = (tab: 'sports' | 'casino') => {
    setActive(tab);
    if (tab === 'sports') {
      navigate('/sports');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative h-10 w-60 rounded-lg bg-gray-800 p-1">
      <div
        className={cn(
          'absolute top-1 h-8 w-1/2 rounded-[6px] bg-white transition-transform duration-300 ease-in-out translate-x-0',
          { 'translate-x-[112px]': active === 'casino' },
        )}
      />

      <div className="relative z-10 flex h-full items-center justify-between">
        <button
          type="button"
          onClick={() => handleSwitch('sports')}
          className={cn(commonStyle, { 'text-black': active === 'sports' })}
        >
          Sports
        </button>
        <button
          type="button"
          onClick={() => handleSwitch('casino')}
          className={cn(commonStyle, { 'text-black': active === 'casino' })}
        >
          Casino
        </button>
      </div>
    </div>
  );
};

export default Switcher;