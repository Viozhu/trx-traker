import axios from 'axios';

export interface PriceData {
    date: string;
    price: number;
}

export async function getCurrentPrice(): Promise<number> {
    const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd'
    );
    return response.data.tron.usd;
}
