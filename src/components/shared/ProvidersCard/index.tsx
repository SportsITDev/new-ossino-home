import { ROUTES } from 'constants/routes.ts';
import { cn } from 'helpers/ui';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/index';
import { refreshFilters } from 'store/games/slice';
import { type Provider } from 'store/providers/slice';
import { mapApiIdToProviderCode } from 'store/providers/constants';

interface ProvidersCardProps {
  provider: Provider;
  className?: string;
}

const ProvidersCard = ({ className, provider }: ProvidersCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id, name, logoUrl } = provider;

  const handleClick = () => {
    const providerCode = mapApiIdToProviderCode(id);

    if (providerCode) {
      // Clear all filters and set only the provider filter
      // This ensures we start fresh on the provider page
      dispatch(refreshFilters({ 
        providers: [providerCode],
        categories: [], // Clear categories
        sort: undefined, // Optionally clear sort
        search: undefined, // Optionally clear search
        favorite: false // Optionally clear favorites
      }));
      navigate(`${ROUTES.providers}/${providerCode}`);
    } else {
      console.warn(`No provider code found for API ID: ${id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'bg-[#1C1C1C] min-w-[180px] h-20 md:h-24 flex items-center justify-center rounded-[12px] cursor-pointer',
        className,
      )}
    >
      <img
        src={logoUrl}
        alt={name}
        className="max-h-[60%] max-w-[60%] object-contain"
      />
    </div>
  );
};

export default ProvidersCard;