import type { ApiGameItem } from 'api/content/content.types';
import type { AxiosResponse } from 'axios';
import type { MenuItem } from 'components/shared/MenuItem/menuItems';

import iconSource from '/sprite-other-icons.svg?url';

export const handleResponse = (response: AxiosResponse<ApiGameItem[]>, selectedGameType?: string) => {
  const { data } = response;

  // Filter games by selectedGameType if provided
  const filteredGameItems = selectedGameType
    ? data.filter(gameItem => gameItem.game_type === selectedGameType)
    : data;

  // Extract unique category names from filtered games
  const categoryMap = new Map<string, { icon: string; count: number }>();

  filteredGameItems.forEach(gameItem => {
    gameItem.game.forEach(game => {
      const categoryName = game.categoryname;
      if (categoryName && categoryName !== 'null' && categoryName !== null) {
        if (!categoryMap.has(categoryName)) {
          categoryMap.set(categoryName, {
            icon: game.categoryicon || 'cat32',
            count: 0
          });
        }
        categoryMap.set(categoryName, {
          ...categoryMap.get(categoryName)!,
          count: categoryMap.get(categoryName)!.count + 1
        });
      }
    });
  });

  const menuItems: MenuItem[] = Array.from(categoryMap.entries()).map(([categoryName, { icon, count }]) => ({
    id: categoryName.toLowerCase().replace(/\s+/g, '-'),
    icon: {
      id: icon,
      href: iconSource,
    },
    label: categoryName,
    count,
    protected: false,
    href: `/categories/${categoryName.toLowerCase().replace(/\s+/g, '-')}`,
  }));

  return menuItems;
};
