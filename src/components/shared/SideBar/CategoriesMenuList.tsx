import { useEffect } from 'react';
import {
  selectCategories,
  selectCategoriesLoading,
} from 'store/categories/selectors';
import { selectSelectedGameType } from 'store/sidebar/selectors';
import { getCategories } from 'store/categories/slice';
import { useAppDispatch, useAppSelector } from 'store/index';
import MenuList from '../MenuItem/MenuList';
import MenuListLoader from './MenuListLoader';
import { useLocation } from 'react-router-dom';

interface CategoriesMenuListProps {
  isOpen: boolean;
  onClick: (itemId: number | string) => void;
}

const CategoriesMenuList = ({ isOpen, onClick }: CategoriesMenuListProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);
  const selectedGameType = useAppSelector(selectSelectedGameType);

  useEffect(() => {
    dispatch(getCategories(selectedGameType));
  }, [dispatch, selectedGameType]);

  if (categoriesLoading) {
    return <MenuListLoader isOpen={isOpen} />;
  }

  if (!categories || categories.length === 0 || location.pathname !== '/') {
    return null;
  }

  return (
    <MenuList list={categories} isOpen={isOpen} onClick={onClick} withBorder />
  );
};

export default CategoriesMenuList;
