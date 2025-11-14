
import { useAppSelector } from '../../../../store';
import { Button } from '../../../shared/ui';
import { selectGames, selectIsLoading, selectError } from '../../../../store/games/selectors';
import type { Game } from '../../../../api/games/games.types';


interface MainPageBlocksProps {
  category?: string;
}


const MainPageBlocks: React.FC<MainPageBlocksProps> = ({ category = 'Lobby' }) => {
  const games = useAppSelector(selectGames) as Game[];
  const loading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  if (loading) {
    return (
      <div className="mb-8">
        <div className="flex justify-center py-8">
          <div className="text-gray-400">Loading games...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-8">
        <div className="text-red-400 text-center py-8">{error}</div>
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="mb-8">
        <p className="text-gray-400 text-center py-8">No games available</p>
      </div>
    );
  }

  // If category is 'Lobby', show all categories as separate sections
  if (category === 'Lobby') {
    // Group games by category
    const gamesByCategory = games.reduce((acc: { [key: string]: Game[] }, game) => {
      const gameCategory = game.categories?.[0] || 'Other';
      if (!acc[gameCategory]) {
        acc[gameCategory] = [];
      }
      acc[gameCategory].push(game);
      return acc;
    }, {});

    return (
      <div className="space-y-12">
        {Object.entries(gamesByCategory).map(([categoryName, categoryGames]) => (
          <section key={categoryName} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">{categoryName}</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categoryGames.slice(0, 12).map((game) => (
                <div key={game.id} className="group cursor-pointer">
                  <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="default" size="sm">
                        Play Now
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="font-medium text-sm truncate text-white">{game.title}</h3>
                    <p className="text-xs text-gray-400">{game.provider}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  // Filter games by specific category
  const filteredGames = games.filter((game) =>
    game.categories && game.categories.includes(category)
  );

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">{category} Games</h2>
        <Button variant="outline" size="sm">
          View All Games
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredGames.map((game) => (
          <div key={game.id} className="group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img
                src={game.image}
                alt={game.title}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="default" size="sm">
                  Play Now
                </Button>
              </div>
            </div>
            <div className="mt-2">
              <h3 className="font-medium text-sm truncate text-white">{game.title}</h3>
              <p className="text-xs text-gray-400">{game.provider}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainPageBlocks;