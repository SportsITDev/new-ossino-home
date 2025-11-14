import { useState } from 'react';

export type RoundedGameIconProps = {
  title: string;
  image: string;
  id: string;
  name?: any;
  game?: any; // Optional full game object for launching
};

const GameRoundedIcon = ({ title, image, id }: RoundedGameIconProps) => {
  const [isLaunching, setIsLaunching] = useState(false);

  const handleClick = async () => {
    if (isLaunching) return;
    
    setIsLaunching(true);
    console.log('Game clicked:', { title, id });
    
    // Simulate game launch delay
    setTimeout(() => {
      setIsLaunching(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-16 xl:w-[88px] gap-2">
      <div
        onClick={handleClick}
        className="flex m-0 justify-center cursor-pointer relative"
      >
        <img
          className="border border-transparent rounded-full w-16 h-16 xl:w-[88px] xl:h-[88px] object-cover bg-gray-900 hover:border-neon-1 cursor-pointer transition-colors"
          alt="Game Icon"
          src={image}
          onError={(e) => {
            e.currentTarget.src = '/default-game-placeholder.png';
          }}
        />
        {isLaunching && (
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-neon-1 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      <span
        title={title}
        className="inline text-xs leading-[14px] text-center overflow-hidden whitespace-nowrap font-bold text-ellipsis text-white"
      >
        {title}
      </span>
    </div>
  );
};

export default GameRoundedIcon;