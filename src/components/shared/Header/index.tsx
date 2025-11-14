import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full fixed md:sticky top-0 z-[100] px-4 pt-4 pb-5 md:pr-4 xl:px-5 bg-black">
      <div className="flex w-full items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="h-5 w-22"
        >
          <img src="/icons/logo.svg" alt="Ossino Logo" className="h-5" />
        </button>
        
        <div className="flex items-center gap-4">
          <span className="text-white text-sm">Casino Home</span>
        </div>
      </div>
    </header>
  );
};

export default Header;