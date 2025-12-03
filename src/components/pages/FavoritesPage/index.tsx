import { ROUTES } from 'constants/routes';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from 'components/shared/GameCard';
import Icon from 'components/shared/Icon';
import { Button } from 'components/shared/ui/Button';
// import GameModal from 'components/shared/GameCard/GameModal';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectUserBalance } from 'store/user/selectors';
import { selectFilteredGames, selectIsLoading } from 'store/games/selectors';
import { selectFavoritesData } from 'store/favourites/selectors';
import { cn } from 'helpers/ui';
// import { BREAKPOINTS, useBreakpoint } from 'helpers/hooks';
import bookmarkBigIcon from '/icons/bookmarkBig.svg?url';
import Loader from 'components/shared/ui/Loader';
import { selectFavoritesLoading } from 'store/favourites/selectors';
import { fetchFavorites } from 'store/favourites/slice';
import { LocalStorageHelper } from 'helpers/storage';
import { STORAGE_KEYS } from 'constants/storage';
import { fetchGames } from 'store/games/slice';

// const TARGET_BALANCE = 500;
const FavoritesPage = () => {
  const dispatch = useAppDispatch();
  const allGames = useAppSelector(selectFilteredGames);
  const favorites = useAppSelector(selectFavoritesData);
  const isLoadingGames = useAppSelector(selectIsLoading);
  const isLoadingFavorites = useAppSelector(selectFavoritesLoading);
  // const userBalance = useAppSelector(selectUserBalance) || 0;
  // const { screenWidth } = useBreakpoint();
  const navigate = useNavigate();
  // const isLargeScreen = screenWidth >= BREAKPOINTS.xl;
  // const [isModalVisible, setModalVisibility] = useState(
  //   userBalance < TARGET_BALANCE && isLargeScreen,
  // );
  const userId = LocalStorageHelper.getItem(STORAGE_KEYS.userId) as string;
  const accessToken = LocalStorageHelper.getItem(
    STORAGE_KEYS.accessToken,
  ) as string;

  useEffect(() => {
    if (userId && accessToken) {
      dispatch(fetchFavorites({ playerId: userId, accessToken }));
      dispatch(fetchGames());
    }
  }, [dispatch, userId, accessToken]);

  // Map favorites to actual game objects
  const favoriteGames = useMemo(() => {
    if (!favorites?.length || !allGames?.length) return [];
    const favoriteCodes = new Set(favorites.map(f => f.gameCode));
    const favoriteCategories = new Set(favorites.map(f => f.categoryName));
    // Find games that match favorite codes
    return allGames.filter(game => favoriteCodes.has(game.id) && favoriteCategories.has(game.categories?.[0] || ''));
  }, [favorites, allGames]);

  const renderEmptyState = () => (
    <div className="mx-auto my-[154px] px-[32px] py-[28px] flex flex-col items-center gap-4">
      <Icon id="bigBookmarkIcon" href={bookmarkBigIcon} className="w-16 h-16" />
      <span className="text-xs w-[218px] px-[20px] text-center">
        It seems like you don&apos;t have favorite games
      </span>
      <Button onClick={() => navigate(ROUTES.search)}>Discover Games</Button>
    </div>
  );

  if (isLoadingGames || isLoadingFavorites) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative z-50 pt-4 gap-2 xl:gap-3 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7',
        {
          'flex bg-gray-800 mt-5 rounded-lg xl:bg-transparent xl:rounded-0':
            !favoriteGames?.length,
        },
      )}
    >
      {(favoriteGames && favoriteGames.length > 0)
        ? favoriteGames.map((game, index) => (
          <GameCard
            key={game.id}
            game={{ ...game, name: game.name || game.title || '' }}
            index={index}
            cardClassName="w-full max-w-[220px] xl:max-w-[230px]"
            descriptionClassName="text-[10px]"
            titleClassName="text-[12px]"
          />
        ))
        : renderEmptyState()}

      {/* <GameModal
        onClose={() => setModalVisibility(false)}
        open={isModalVisible}
      /> */}
    </div>
  );
};

export default FavoritesPage;
