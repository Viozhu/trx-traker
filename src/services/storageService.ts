import * as fs from 'fs';
import * as path from 'path';
import { PriceData } from './priceService';

const PRICES_FILE = path.join(__dirname, '../data/prices.json');

export function loadPrices(): PriceData[] {
    try {
        const data = fs.readFileSync(PRICES_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export function savePrices(prices: PriceData[]): void {
    fs.writeFileSync(PRICES_FILE, JSON.stringify(prices, null, 2));
}

export function addPrice(price: number): void {
    const prices = loadPrices();
    const today = new Date().toISOString().split('T')[0];

    const existingIndex = prices.findIndex(p => p.date === today);

    if (existingIndex >= 0) {
        prices[existingIndex].price = price;
    } else {
        prices.push({ date: today, price });
    }

    savePrices(prices);
}

export function getPriceFromDaysAgo(days: number): number | null {
    const prices = loadPrices();
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - days);
    const targetDateStr = targetDate.toISOString().split('T')[0];

    const priceData = prices.find(p => p.date === targetDateStr);
    return priceData ? priceData.price : null;
}
