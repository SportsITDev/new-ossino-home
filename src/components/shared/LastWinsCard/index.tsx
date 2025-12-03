import { currencySymbols } from 'constants/currencies';
import { formatNumber } from 'helpers/numbers';

interface ILastWinsCardProps {
  winnerName: string;
  win: number;
  currency: string;
  winTime: string;
  game: {
    src: string;
    alt: string;
  };
}

const LastWinsCard = ({
  winnerName,
  win,
  currency,
  winTime,
  game,
}: ILastWinsCardProps) => {
  const formattedWinAmount = formatNumber(win, 2);

  return (
    <div className="bg-[#1C1C1C] rounded-[12px] w-[214px] p-2 flex justify-between items-start">
      <div className="flex gap-2 min-w-0 flex-1 mr-2">
        <img src={game.src} alt={game.alt} className="w-12 h-12 bg-cover rounded-lg flex-shrink-0" />
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-neon-1 font-bold text-base">
            {currencySymbols[currency]}{formattedWinAmount}
          </span>
          <span className="text-xs text-gray-400 truncate">{winnerName}</span>
        </div>
      </div>
      <span className="text-gray-400 text-xs flex-shrink-0">{winTime}</span>
    </div>
  );
};

export default LastWinsCard;
