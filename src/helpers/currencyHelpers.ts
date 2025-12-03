import type { WalletCurrency } from 'api/wallet/wallet.types';

/**
 * Get the properly formatted balance for a currency, applying multiplier for crypto
 */
export function getFormattedBalance(currency: WalletCurrency): number {
    if (currency.currencyType === 'CRYPTO' && currency.multiplier) {
        return currency.totalBalance * currency.multiplier;
    }
    return currency.totalBalance;
}

/**
 * Get a formatted display string for a currency balance
 */
export function getFormattedBalanceDisplay(currency: WalletCurrency): string {
    const balance = getFormattedBalance(currency);
    return balance.toString();
}

/**
 * Get formatted balance from raw values (for cases where we don't have WalletCurrency object)
 */
export function getFormattedBalanceFromRaw(
    totalBalance: number,
    multiplier: number | null,
    currencyType: string
): number {
    if (currencyType === 'CRYPTO' && multiplier) {
        return totalBalance * multiplier;
    }
    return totalBalance;
}

/**
 * Get formatted display string from raw values
 */
export function getFormattedBalanceDisplayFromRaw(
    totalBalance: number,
    multiplier: number | null,
    currencyType: string
): string {
    const balance = getFormattedBalanceFromRaw(totalBalance, multiplier, currencyType);
    return balance.toString();
}