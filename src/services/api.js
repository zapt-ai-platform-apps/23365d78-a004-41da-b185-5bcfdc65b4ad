export const fetchConversionRate = async (fromCurrency, toCurrency) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency}&vs_currencies=${toCurrency}`);
    if (!response.ok) {
        throw new Error('Failed to fetch conversion rate');
    }
    const data = await response.json();
    return data[fromCurrency][toCurrency];
};