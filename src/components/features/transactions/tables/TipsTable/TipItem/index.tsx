import { cn } from "helpers/ui";
import { useEffect, useMemo } from "react";

import Icon from "components/shared/Icon";
import { BREAKPOINTS, useBreakpoint } from "helpers/hooks";
import { formatTransactionsDateToRender } from "helpers/transactions/formatDate";
import userAvatarIcon from '/icons/userAvatar.svg?url';

import { useAppDispatch, useAppSelector } from "store/index";
import { getAllUsers } from "store/users/slice";
import failedIcon from '/icons/failedIcon.svg?url';
import pendingIcon from '/icons/pendingIcon.svg?url';
import successIcon from '/icons/successIcon.svg?url';
import { type TipTransaction } from "store/transactions/types";
import { formatNumber } from "helpers/numbers";
import { TRANSACTION_STATUS } from "store/transactions/constants";

type TipItemProps = {
  tipItem: TipTransaction
}

const TipItem = ({ tipItem }: TipItemProps) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.data);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const allUsers = useMemo(() => {
    if (!users) {
      return null;
    }
    return users.map((user) => ({
      id: user.id,
      userName: user.userName,
    }));
  }, [users]);

  const { date, amount, status, currency, senderId, receiverId } = tipItem;
  const formattedAmount = formatNumber(amount);
  const iconSrc = currency.icon || '/icons/currencies/etheriumLogo.svg';
  const userId = (amount > 0) ? senderId : receiverId;
  const userName = allUsers?.find((user) => user.id === userId)?.userName ?? '';

  const { screenWidth } = useBreakpoint();
  const isDesktopScreen = screenWidth >= BREAKPOINTS.xl;

  return (
    <div className="flex flex-row justify-start items-center bg-gray-800 box-border h-11 border border-gray-800 xl:border-gray-700 rounded-xl pl-0 pr-0">
      <div className="w-[140px] xl:w-[300px] pl-3 text-start text-xs lg:text-sm leading-[10px]">
        {formatTransactionsDateToRender(date)}
      </div>
      <div className="flex text-xs items-center text-gray-300 h-11 font-medium leading-4 w-[130px] md:w-1/2 gap-1.5">
        <img src={iconSrc} alt={currency.contraction || 'currency'} className="w-4 h-4" />
        <span className={cn({ "text-success-green": amount > 0 })}>{amount > 0 ? `+${formattedAmount}` : formattedAmount}</span>
      </div>
      <div className="flex items-center min-w-[140px] md:w-1/2 gap-1.5 text-xs lg:text-sm leading-[18px]">
        {tipItem.isPublic ? (
          <div className="min-w-[140px] flex flex-row items-center gap-1">
            <Icon href={userAvatarIcon} id="userAvatarIcon" className="w-4 h-4" />
            <div>@{userName}</div>
          </div>
        ) : (<span>Anonymous</span>)}
      </div>
      <div className="flex w-[48px] xl:w-[100px] items-center justify-center ml-auto">
        {isDesktopScreen ? (
          <div className={cn("rounded-full py-1 px-2 text-xs leading-4",
            { "bg-success-green-bg text-success-green": status === TRANSACTION_STATUS.Success },
            { "bg-pending-yellow-bg text-pending-yellow": status === TRANSACTION_STATUS.Pending },
            { "bg-failed-red-bg text-failed-red": status === TRANSACTION_STATUS.Failed }
          )}>
            {status}
          </div>
        )
          :
          <>
            {status === TRANSACTION_STATUS.Success && (<Icon href={successIcon} id="successIcon" className="h-5 w-5" />)}
            {status === TRANSACTION_STATUS.Pending && (<Icon href={pendingIcon} id="pendingIcon" className="h-5 w-5" />)}
            {status === TRANSACTION_STATUS.Failed && (<Icon href={failedIcon} id="failedIcon" className="h-5 w-5" />)}
          </>
        }
      </div>
    </div>
  )
}


export default TipItem