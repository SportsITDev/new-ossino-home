import { CURRENCY_CODE_MAPPING, CURRENCIES } from 'constants/currencies';
import { STORAGE_KEYS } from 'constants/storage';
import { useEffect } from 'react';

import type { WalletCurrency } from 'api/wallet/wallet.types';
import { getFormattedBalanceDisplay } from 'helpers/currencyHelpers';
import { formatNumber } from 'helpers/numbers';
import { LocalStorageHelper } from 'helpers/storage';
import { useAppSelector, useAppDispatch } from 'store/index';
import { selectWalletState } from 'store/wallet/selectors';
import { setSelectedCurrency } from 'store/wallet/slice';

import Select from '../Select';

const { sportsBookPlatformEvents } = window;

export function getCurrencyIconByCode(code: string): string | undefined {
  const mapped = (CURRENCY_CODE_MAPPING as Record<string, string>)[code];
  if (mapped && CURRENCIES[mapped]?.icon) return CURRENCIES[mapped].icon;
  for (const key in CURRENCIES) {
    if (CURRENCIES[key].contraction === code && CURRENCIES[key].icon) {
      return CURRENCIES[key].icon;
    }
  }
  return undefined;
}

function getDisplayCurrencyCode(code: string): string {
  const mapped = (CURRENCY_CODE_MAPPING as Record<string, string>)[code];
  if (mapped && CURRENCIES[mapped]?.contraction) {
    return CURRENCIES[mapped].contraction;
  }

  return code.replace(/_TEST\d*$/, '');
}

const CurrencyDropdown = () => {
  const dispatch = useAppDispatch();
  const { currencies, selectedCurrency } = useAppSelector(selectWalletState);

  useEffect(() => {
    if (currencies && currencies.length > 0 && !selectedCurrency) {
      const initialCurrency =
        currencies.find((currency) => currency.userDefaultCurrency) ||
        currencies.find((currency) => currency.brandDefaultCurrency) ||
        currencies[0];
      if (initialCurrency) {
        dispatch(setSelectedCurrency(initialCurrency));
      }
    }
  }, [currencies, selectedCurrency, dispatch]);

  const handleCurrencySelect = (currency: (typeof currencies)[0]) => {
    dispatch(setSelectedCurrency(currency));
    const accessToken = LocalStorageHelper.getItem(
      STORAGE_KEYS.accessToken,
    ) as string;
    const userId = LocalStorageHelper.getItem(STORAGE_KEYS.userId) as string;
    sportsBookPlatformEvents.sendPostMessage('user-authorization', {
      operatorToken: accessToken,
      userId,
      currencyCode: currency.currencyCode,
      currencySymble: '$',
      languageCode: 'en',
    });
  };

  const displayCurrencyCode = selectedCurrency
    ? getDisplayCurrencyCode(selectedCurrency.currencyCode)
    : '';

  return (
    <Select
      dropDownClassName="min-w-[245px] max-w-[310px] bg-gray-700 left-0"
      className="min-w-28 bg-gray-700"
      withChevron
      closeOnClick
      additionalChild={
        <div className="flex items-center justify-between w-full max-w-[100px]">
          <span className="xl:hidden block text-xs">{displayCurrencyCode}</span>
          <span className="xl:block hidden h-fit">
            <div style={{ maxWidth: '95px', overflow: 'hidden', textOverflow: 'ellipsis' }}
              className="font-medium text-xs h-fit ml-2">
              {selectedCurrency ? getFormattedBalanceDisplay(selectedCurrency) : '0.00'}
            </div>
          </span>
        </div>
      }
      list={
        <>
          {currencies.map((currency) => {
            const iconPath = getCurrencyIconByCode(currency.currencyCode);
            const displayCode = getDisplayCurrencyCode(currency.currencyCode);
            return (
              <div
                key={currency.currencyCode}
                className="border-b border-gray-600 last:border-none flex items-center gap-2 px-3 py-2"
                onClick={() => handleCurrencySelect(currency)}
              >
                <img
                  src={iconPath || '/icons/currencies/etheriumLogo.svg'}
                  alt={displayCode}
                  className="h-4 w-4 flex-shrink-0"
                />
                <span className="text-xs font-semibold">{displayCode}</span>
                <span className="text-xs ml-auto text-neon-1">
                  {getFormattedBalanceDisplay(currency)}
                </span>
              </div>
            );
          })}
        </>
      }
    >
      <div className="flex items-center justify-between xl:justify-center gap-1 px-1.5">
        <span className="flex items-center w-4 h-4">
          {selectedCurrency && (
            <img
              src={
                getCurrencyIconByCode(selectedCurrency.currencyCode) ||
                '/icons/currencies/etheriumLogo.svg'
              }
              alt={displayCurrencyCode}
              className="h-6 w-6 mr-1"
            />
          )}
        </span>
        <span className="flex items-center font-semibold">
          <span className="xl:flex hidden text-xs">{displayCurrencyCode}</span>
          <span className="xl:hidden flex items-center max-w-[90px]">
            <span
              className="font-medium text-xs truncate block whitespace-nowrap"
              style={{ maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis' }}
              title={selectedCurrency ? getFormattedBalanceDisplay(selectedCurrency) : '0.00'}
            >
              {selectedCurrency ? getFormattedBalanceDisplay(selectedCurrency) : '0.00'}
            </span>
          </span>
        </span>
      </div>
    </Select>
  );
};

export default CurrencyDropdown;
