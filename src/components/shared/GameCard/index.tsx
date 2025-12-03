import { STORAGE_KEYS } from 'constants/storage';
import { useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/shared/Icon';
import { cn } from 'helpers/ui';
import StatusIndicator from 'components/shared/StatusIndicator';
import GameModal from 'components/shared/GameCard/GameModal';
import { useAppDispatch, useAppSelector } from 'store/index';
import { setCurrentGameId } from 'store/games/slice';
import { selectUserBalance } from 'store/user/selectors';
import bookmark from '/icons/bookmark.svg?url';
import info from '/icons/info.svg?url';
import {
  selectIsGameFavorited,
  selectIsGameFavoriteLoading,
} from 'store/favourites/selectors';
import { toggleFavorite } from 'store/favourites/slice';
import { LocalStorageHelper } from 'helpers/storage';
import styles from './style.module.css';

const PINK = 'shadow-custom-pink';
const GOLD = 'shadow-custom-gold';
const PURPLE = 'shadow-custom-purple';

interface GameCardProps {
  game: {
    id: string;
    title: string;
    players: number;
    image: string;
    group: string;
    name: string;
    categories: string[];
    providers: string[];
    aggregator_type: string[];
  };
  index: number;
  cardClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  operatorId?: string;
  brandId?: string;
}

const GameCard = ({
  game,
  index,
  cardClassName,
  descriptionClassName,
  titleClassName,
  operatorId = 'ossino',
  brandId = 'ossino',
}: GameCardProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const balance = useAppSelector(selectUserBalance);
  const isFavorited = useAppSelector(selectIsGameFavorited(game.id));
  const isLoadingFavorite = useAppSelector(
    selectIsGameFavoriteLoading(game.id),
  );
  const navigate = useNavigate();
  const shadows = [PURPLE, PINK, GOLD];
  const currentShadow = shadows[index % shadows.length];

  const accessToken = LocalStorageHelper.getItem(STORAGE_KEYS.accessToken);
  const userId = LocalStorageHelper.getItem(STORAGE_KEYS.userId);
  const isLoggedIn = !!(accessToken && userId);

  const livePlayers = Math.floor(Math.random() * 451) + 50;
  const formattedPlayersNumber = livePlayers.toLocaleString('en-US', {
    maximumFractionDigits: 0,
  });

  const closeModalHandler = () => {
    setIsOpenModal(false);
  };

  const setFavoriteHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (balance !== undefined && balance < 500) {
      setIsOpenModal(true);
      return;
    }
    const accessToken =
      LocalStorageHelper.getItem(STORAGE_KEYS.accessToken) || '';
    const userId = LocalStorageHelper.getItem(STORAGE_KEYS.userId) || '';
    const favoriteRequest = {
      accessToken: accessToken as string,
      action: isFavorited ? ('remove' as const) : ('set' as const),
      aggregator: game.aggregator_type[0] || '',
      brandId,
      categoryName: game.categories[0] || '',
      gameId: game.id,
      gameName: game.name,
      operatorId,
      providerName: game.providers[0] || '',
      userId: userId as string,
    };

    try {
      await dispatch(toggleFavorite(favoriteRequest)).unwrap();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const setCurrentGameHandler = () => {
    dispatch(setCurrentGameId({ id: game.id }));
    const slug = game.name.replace(/\s+/g, '-');
    navigate(`/game-details/${encodeURIComponent(slug)}`);
  };

  return (
    <>
      <GameModal open={isOpenModal} onClose={closeModalHandler} />
      <div
        className={cn(
          'relative cursor-pointer border border-[#FFFFFF1A] rounded-xl',
          cardClassName,
        )}
        onClick={setCurrentGameHandler}
      >
        {isLoggedIn && (
          <button
            type="button"
            onClick={setFavoriteHandler}
            disabled={isLoadingFavorite}
            className={cn(
              'z-[60] cursor-pointer absolute right-1.5 top-1.5 h-8 w-8 rounded-full flex justify-center items-center bg-[#2C2C2C4D]',
              { 'opacity-50 cursor-not-allowed': isLoadingFavorite },
            )}
          >
            <span>
              <Icon
                id="bookmarkIcon"
                href={bookmark}
                className={cn('h-4 w-4', {
                  'fill-current text-[#D8FF68]': isFavorited,
                  'animate-pulse': isLoadingFavorite,
                })}
              />
            </span>
          </button>
        )}
        <div className={cn('relative aspect-square w-full', styles.imageBox)}>
          <img
            src={game.image}
            alt={game.title}
            className="z-50 block absolute top-0 left-0 object-cover h-full w-full rounded-t-[12px]"
          />
        </div>
        <div className="relative overflow-hidden">
          <div
            className={cn(
              ' left-0 top-0 w-full h-full z-40 blur-1',
              styles.decorations,
            )}
          >
            <div
              className={cn(
                'absolute w-[85px] -top-[22px] z-20',
                styles.itemPurple,
                currentShadow,
              )}
            />
            {currentShadow === PURPLE && (
              <div
                className={cn(
                  'absolute w-8 -top-1 z-10 shadow-custom-yellow',
                  styles.itemYellow,
                )}
              />
            )}
          </div>
          <div className="py-3 px-2 z-50 relative">
            <h3
              className={cn(
                'font-bold text-white text-base leading-none capitalize',
                titleClassName,
              )}
            >
              {game.title}
            </h3>
            <span className="text-gray-400 text-[12px] capitalize">{game.group}</span>
            <div className="flex justify-between items-center">
              <div
                className={cn(
                  'flex items-center text-[12px]',
                  descriptionClassName,
                )}
              >
                <StatusIndicator className="h-2.5 w-2.5" />
                <span className="pl-[5px] pr-[2px] ">
                  {formattedPlayersNumber}
                </span>
                <span className="text-gray-400 ">playing</span>
              </div>
              <span>
                <Icon
                  id="infoIcon"
                  href={info}
                  className="w-[14px] h-[14px] fill-current text-[#999999]"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
