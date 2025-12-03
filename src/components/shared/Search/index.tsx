import { FILTERS } from 'constants/filters.ts';
import { type ChangeEvent, useEffect, useState } from 'react';
import Icon from 'components/shared/Icon';
import searchIcon from '/icons/searchNormal.svg?url';
import close from '/icons/close.svg?url';
import { useAppDispatch } from 'store/index';
import { refreshFilters } from 'store/games/slice';
import debounce from 'lodash.debounce';
import { useFilters } from 'components/shared/Search/useFilters';
import { useCustomQueryParams } from 'helpers/useCustomQueryParams';

const Search = () => {
  const [query, setQuery] = useState('');
  const { applyFilter, clearFilter, search } = useCustomQueryParams();
  const dispatch = useAppDispatch();

  const filters = useFilters();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value) {
      clearFilter(FILTERS.search);
    }
    setQuery(e.currentTarget.value);
  };

  const clearQueryHandler = () => {
    setQuery('');
    clearFilter(FILTERS.search);
  };

  useEffect(() => {
    const debouncedDispatch = debounce(() => {
      dispatch(refreshFilters({ search: query }));
      if (query) {
        applyFilter(FILTERS.search, query);
      }
    }, 1000);

    debouncedDispatch();

    return () => {
      debouncedDispatch.cancel();
    };
  }, [query, dispatch, applyFilter]);

  useEffect(() => {
    if (search) {
      setQuery(search);
      applyFilter(FILTERS.search, search);
    }
  }, [applyFilter, search]);

  return (
    <div className="flex w-full gap-2 z-[300]">
      <div className="relative w-full">
        <span className="absolute transform translate-y-1/2 w-5 h-5 left-3.5 ">
          <Icon
            id="searchNormalIcon"
            href={searchIcon}
            className="stroke-[#7F7F7F] " />
        </span>
        {query &&
          <button
            type="button"
            onClick={clearQueryHandler}
            className="absolute transform translate-y-1/2 w-5 h-5 right-3.5 bg-[#4C4A4A] rounded-full">
            <Icon
              id="closeIcon"
              href={close}
              className="stroke-white" />
          </button>}
        <input
          placeholder="Search"
          className="h-10 rounded-lg bg-gray-700 z-0 outline-0 w-full px-10"
          value={query}
          onChange={onChangeHandler}
        />
      </div>
      {filters}
    </div>

  );
};

export default Search;
