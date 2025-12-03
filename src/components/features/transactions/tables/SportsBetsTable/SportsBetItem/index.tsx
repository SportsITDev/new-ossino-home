import { cn } from "helpers/ui";

import CopyButton from "components/shared/CopyButton";
import Icon from "components/shared/Icon";
import { BREAKPOINTS, useBreakpoint } from "helpers/hooks";
import { formatTransactionsDateToRender } from "helpers/transactions/formatDate";

import failedIcon from '/icons/failedIcon.svg?url';
import pendingIcon from '/icons/pendingIcon.svg?url';
import successIcon from '/icons/successIcon.svg?url';
import type { SportBet } from "store/transactions/types";
import { formatNumber } from "helpers/numbers";
import { BET_STATUS } from "store/transactions/constants";

type SportsBetItemProps = {
  sportBet: SportBet
}

const SportsBetItem = ({ sportBet }: SportsBetItemProps) => {
  const { date, event, odds, stake, payout, currency, transactionId, status } = sportBet;
  const formattedStake = formatNumber(stake);
  const formattedPayout = formatNumber(payout);
  const { icon: currencyIcon } = currency;

  const { screenWidth } = useBreakpoint();
  const isDesktopScreen = screenWidth >= BREAKPOINTS.xl;

  return (
    <div className="flex flex-row no-scrollbar overflow-visible w-fit md:w-full justify-start items-center box-border h-11 text-sm border border-gray-800 xl:border-gray-700 bg-gray-800 rounded-xl pl-0 pr-0">
      <div className="min-w-[120px] xl:w-[180px] pl-3 text-start text-xs lg:text-sm leading-[18px]">
        {formatTransactionsDateToRender(date)}
      </div>
      <div className="min-w-[130px] xl:w-[200px] text-xs lg:text-sm text-start">
        {event}
      </div>
      <div className="min-w-[80px] xl:w-[100px] text-xs lg:text-sm text-start">
        {odds}
      </div>
      <div className="flex items-center min-w-[130px] xl:w-[200px] gap-1 text-xs lg:text-sm leading-[18px]">
        <Icon href={currencyIcon} id={currency.contraction || 'currencyIcon'} className="w-4 h-4" />
        <div>{formattedStake}</div>
      </div>
      <div className="flex items-center min-w-[130px] xl:w-[200px] gap-1 text-xs lg:text-sm leading-[18px]">
        <Icon href={currencyIcon} id={currency.contraction || 'currencyIcon'} className="w-4 h-4" />
        <div>{formattedPayout}</div>
      </div>
      <div className="min-w-[100px] md:min-w-[85px] xl:w-[110px] text-xs lg:text-sm leading-[18px]">
        <div className="w-[76px] flex flex-row items-center gap-1">
          <div className="min-w-[60px] text-xs overflow-hidden whitespace-nowrap text-ellipsis">{transactionId}</div>
          <CopyButton valueToCopy={transactionId} />
        </div>
      </div>
      <div className="flex min-w-[48px] xl:w-[100px] items-center justify-center ml-auto">
        {isDesktopScreen ? (
          <div className={cn("rounded-full py-1 px-3 md:text-xs lg:text-xs leading-4",
            { "bg-success-green-bg text-success-green": status === BET_STATUS.Win },
            { "bg-pending-yellow-bg text-pending-yellow": status === BET_STATUS.Return },
            { "bg-failed-red-bg text-failed-red": status === BET_STATUS.Lost }
          )}>
            {status}
          </div>
        )
          :
          <>
            {status === BET_STATUS.Win && (<Icon href={successIcon} id="successIcon" className="h-5 w-5" />)}
            {status === BET_STATUS.Return && (<Icon href={pendingIcon} id="pendingIcon" className="h-5 w-5" />)}
            {status === BET_STATUS.Lost && (<Icon href={failedIcon} id="failedIcon" className="h-5 w-5" />)}
          </>
        }
      </div>
    </div>
  )
}


export default SportsBetItem