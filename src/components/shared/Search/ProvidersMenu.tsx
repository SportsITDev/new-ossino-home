import { FILTERS } from 'constants/filters.ts';
import { useAppSelector } from 'store/index';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from 'components/shared/ui/Table';
import { cn } from 'helpers/ui';
import { selectProviders } from 'store/providers/selectors';
import { selectFilteredGameCountMapForAllProviders } from 'store/games/selectors';
import { Checkbox } from 'components/shared/ui/Checkbox';
import { Button } from 'components/shared/ui/Button';
import { useCustomQueryParams } from 'helpers/useCustomQueryParams';
import { replaceString } from 'helpers/common';
import { mapApiIdToProviderCode } from 'store/providers/constants';

const ProvidersMenu = () => {
  const { providers, categories, applyFilter, clearFilter } = useCustomQueryParams();
  const providersItems = useAppSelector(selectProviders);
  const providersCount = useAppSelector(
    selectFilteredGameCountMapForAllProviders,
  );
  const filteredProviders = providersItems?.filter((item) => {
    const providerCode = mapApiIdToProviderCode(item.id);
    if (categories && categories.length > 0) {
      return providerCode && (providersCount[providerCode] || 0) > 0;
    }
    return providerCode && (providersCount[providerCode] || 0) > 0;
  });

  return (
    <div className={cn('z-[1000] min-w-[180px] xl:w-[250px] rounded-lg px-4')}>
      <Button
        onClick={() => {
          clearFilter(FILTERS.provider);
        }}
        className="bg-transparent border border-neon-1 text-neon-1 mt-2 w-full"
      >
        Clear All
      </Button>
      <Table>
        <TableBody className="flex flex-col">
          {filteredProviders?.map((item) => {
            const providerCode = mapApiIdToProviderCode(item.id);
            const count = providerCode ? providersCount[providerCode] || 0 : 0;
            const isActive = providerCode
              ? providers?.includes(providerCode)
              : false;
            return (
              <TableRow
                key={item.id}
                className="border-b border-b-[#383838] text-nowrap w-full"
              >
                <TableCell className="flex w-full">
                  <div
                    className="flex w-full items-center justify-between"
                    onClick={() => {
                      if (providerCode) {
                        applyFilter(FILTERS.provider, providerCode);
                      }
                    }}
                  >
                    <span
                      className={cn(
                        'w-full flex gap-2 items-center capitalize cursor-pointer ',
                      )}
                    >
                      <Checkbox
                        className="border-gray-500 "
                        checked={isActive}
                      />
                      <span className={cn('', { 'text-neon-1': isActive })}>
                        {replaceString(item.name, /_/g, ' ')}
                      </span>
                    </span>
                    <span
                      className={cn(
                        'text-white font-medium text-[10px] text-center w-[22px] h-[16px] rounded-[100px] bg-gray-600',
                        { 'text-gray-900 bg-neon-1': isActive },
                      )}
                    >
                      {count}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProvidersMenu;
