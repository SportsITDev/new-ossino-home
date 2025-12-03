/* eslint-disable no-nested-ternary */
import SortingColumn from "components/shared/SortingColumnWithArrows";
import useScrollShadows, { BREAKPOINTS, useBreakpoint } from "helpers/hooks";
import { sortRawTransactions } from "helpers/transactions/sorting/sortRawTransactions";
import { cn } from "helpers/ui";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "store/index";
import { selectUserSportsBets } from "store/transactions/selectors";
import type { SortConfig, SortField, SportBet } from "store/transactions/types";
import { useSortQueryParams } from "helpers/transactions/hooks/useSortQueryParams";
import { SORT_FIELD, SORT_STATE } from "store/transactions/constants";
import styles from '../../TransactionsContent/transactionsContent.module.css';
import NoTransactionsPlaceholder from "../NoTransactionsPlaceholder";

import SportsBetItem from "./SportsBetItem";

const SportsBetsTable = () => {
  const { screenWidth } = useBreakpoint();
  const { getSortParams, updateSortParams } = useSortQueryParams();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { showBefore, showAfter } = useScrollShadows(containerRef);
  const isDesktopScreen = screenWidth >= BREAKPOINTS.xl;

  const initialSortConfig = getSortParams();

  const sportBetsFromServer = useAppSelector(selectUserSportsBets);

  const [sortedBets, setSortedBets] = useState<SportBet[]>(sportBetsFromServer);
  const [sortConfig, setSortConfig] = useState<SortConfig>(
    initialSortConfig.length 
      ? initialSortConfig
      : [{ field: SORT_FIELD.DATE, order: SORT_STATE.NONE }]
  );

  useEffect(() => {
    let result = [...sportBetsFromServer];
    sortConfig.forEach(({ field, order }) => {
      if (order !== SORT_STATE.NONE) {
        result = sortRawTransactions(result, field, order) as SportBet[];
      }
    });
    setSortedBets(result);
  }, [sortConfig, sportBetsFromServer]);

  const handleSortBets = (sortType: SortField) => {
    setSortConfig((prevConfig) => {
      const existingIndex = prevConfig.findIndex((config) => config.field === sortType);
      const newConfig = [...prevConfig];

      if (existingIndex >= 0) {
        const currentOrder = newConfig[existingIndex].order;
        newConfig[existingIndex].order =
          currentOrder === SORT_STATE.NONE ? SORT_STATE.DESC :
            currentOrder === SORT_STATE.DESC ? SORT_STATE.ASC :
              SORT_STATE.NONE;

      } else {
        newConfig.push({ field: sortType, order: SORT_STATE.ASC });
      }

      updateSortParams(newConfig);
      return newConfig;
    });
  };
  return (
    <div className="shadow-wrapper relative">
      <div
        className={cn(styles.buttons_wrapper, 'no-scrollbar overflow-x-auto md:overflow-hidden p-0', {
          [styles.show_before]: showBefore,
          [styles.show_after]: showAfter
        })}
        ref={containerRef}
      >
        <div className={cn("table-header flex flex-row justify-start gap-0", { "md:border-b md:border-b-gray-700": !sortedBets.length })}>
          <div className="flex text-xs items-center text-gray-300 h-11 min-w-[120px] xl:w-[180px] font-medium leading-4">
            <SortingColumn 
              label={isDesktopScreen? 'Date': 'Date Placed'} 
              handleSort={() => {handleSortBets(SORT_FIELD.DATE)}}
              state={sortConfig.find((config) => config.field === SORT_FIELD.DATE)?.order || SORT_STATE.NONE}
            />
          </div>
          <div className="flex text-xs ml-0 items-center min-w-[130px] xl:w-[200px] text-gray-300 h-11 font-medium leading-4">
            <span className="xl:hidden inline-block text-gray-300">Event</span>
            {isDesktopScreen && (
              <SortingColumn 
                label='Event' 
                handleSort={() => {handleSortBets(SORT_FIELD.EVENT)}}
                state={sortConfig.find((config) => config.field === SORT_FIELD.EVENT)?.order || SORT_STATE.NONE}
              />)}
          </div>
          <div className="flex text-xs items-center !ml-0 min-w-[80px] xl:w-[100px] text-gray-300 h-11 font-medium leading-4">
            <SortingColumn 
              label="Odds" 
              handleSort={() => {handleSortBets(SORT_FIELD.ODDS)}}
              state={sortConfig.find((config) => config.field === SORT_FIELD.ODDS)?.order || SORT_STATE.NONE}
            />
          </div>
          <div className="flex text-xs items-center min-w-[130px] xl:w-[200px] text-gray-300 h-11 font-medium leading-4">
            <SortingColumn 
              label="Stake" 
              handleSort={() => {handleSortBets(SORT_FIELD.STAKE)}}
              state={sortConfig.find((config) => config.field === SORT_FIELD.STAKE)?.order || SORT_STATE.NONE}
            />
          </div>
          <div className="flex text-xs items-center min-w-[130px] xl:w-[200px] text-gray-300 h-11 font-medium leading-4">
            <SortingColumn 
              label="Payout" 
              handleSort={() => {handleSortBets(SORT_FIELD.PAYOUT)}}
              state={sortConfig.find((config) => config.field === SORT_FIELD.PAYOUT)?.order || SORT_STATE.NONE}
            />
          </div>
          <div className="flex text-xs items-center min-w-[100px] md:min-w-[90px] xl:w-[110px] text-gray-300 h-11 font-medium leading-4">
            <span className="inline-block xl:hidden text-gray-300">Bet ID</span>
            {isDesktopScreen && (
              <SortingColumn 
                label="Transaction ID" 
                handleSort={() => {handleSortBets(SORT_FIELD.TRANSACTION_ID)}}
                state={sortConfig.find((config) => config.field === SORT_FIELD.TRANSACTION_ID)?.order || SORT_STATE.NONE}
              />
            )}
          </div>
          <div className="flex text-xs items-center ml-auto justify-center text-gray-300 h-11 font-medium min-w-[48px] xl:w-[100px] text-center leading-4">Status</div>
        </div><div className="table-content flex flex-col gap-2">
          {!sortedBets.length 
            ? (<NoTransactionsPlaceholder />)
            : 
            (sortedBets.map((bet) => (
              <SportsBetItem sportBet={bet} />
            )))}
        </div>
      </div>
    </div>
  )
}

export default SportsBetsTable