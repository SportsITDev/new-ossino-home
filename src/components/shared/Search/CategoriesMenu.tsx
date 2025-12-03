import { FILTERS } from 'constants/filters.ts';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from 'components/shared/ui/Table';
import { Button } from 'components/shared/ui/Button';
import { Checkbox } from 'components/shared/ui/Checkbox';
import { useAppSelector } from 'store/index';
import { selectFilteredGameCountMapForAllCategories } from 'store/games/selectors';
import { useCustomQueryParams } from 'helpers/useCustomQueryParams';
import { cn } from 'helpers/ui';
import { replaceString } from 'helpers/common';
import { selectCategories } from 'store/categories/selectors';
import { mapApiIdToCategoryCode } from 'store/games/constants';

const CategoriesMenu = () => {
  const { categories, applyFilter, clearFilter } = useCustomQueryParams();
  const categoriesItems = useAppSelector(selectCategories);

  const filteredCategories = categoriesItems?.filter((item) => {
    const originalCount = item.count || 0;

    const mappedCount = item.count || 0;

    const totalCount = Math.max(originalCount, mappedCount);
    return totalCount > 0;
  });

  return (
    <div className={cn('min-w-[180px] xl:w-[250px] rounded-lg px-4')}>
      <Button
        className="bg-transparent border border-neon-1 text-neon-1 mt-2 w-full"
        onClick={() => {
          clearFilter(FILTERS.category);
        }}
      >
        Clear All
      </Button>
      <Table>
        <TableBody className="flex flex-col">
          {filteredCategories?.map((item) => {
            const originalCount = item.count || 0;
            const mappedCount = item.count || 0;
            const count = Math.max(originalCount, mappedCount);

            const filterValue = item.label;
            const isActive = categories?.includes(filterValue);
            return (
              <TableRow
                key={item.id}
                className="border-b border-b-[#383838] text-nowrap w-full"
              >
                <TableCell className="flex w-full">
                  <div
                    className="flex w-full items-center justify-between"
                    onClick={() => {
                      const filterValue = item.label;
                      applyFilter(FILTERS.category, filterValue);
                    }}
                  >
                    <span
                      className={cn(
                        'w-full flex gap-2 items-center capitalize cursor-pointer',
                      )}
                    >
                      <Checkbox
                        className="border-gray-500"
                        checked={isActive}
                      />
                      <span className={cn('', { 'text-neon-1': isActive })}>
                        {item.label || replaceString(filterValue, /-/g, ' ')}
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

export default CategoriesMenu;