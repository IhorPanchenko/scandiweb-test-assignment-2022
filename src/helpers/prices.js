export const getTotalPrice = (items, symbol) => {
  const sum = items.reduce(
    (prev, item) => Number(prev) + getCurrentPrice(symbol, item.prices).amount,
    0
  );

  return sum.toFixed(2);
};

export const getCurrentPrice = (symbol, prices) => {
  const price = prices.find((price) => price.currency.symbol === symbol);

  return price;
};
