export function comparePrices(currentPrice: number, oldPrice: number): string {
    if (currentPrice > oldPrice) {
        return 'más caro';
    } else if (currentPrice < oldPrice) {
        return 'más barato';
    } else {
        return 'igual';
    }
}

export function calculatePercentageChange(currentPrice: number, oldPrice: number): number {
    return ((currentPrice - oldPrice) / oldPrice) * 100;
}
