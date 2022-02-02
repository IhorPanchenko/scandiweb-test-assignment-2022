export const getTotalPrice = (items, symbol) => {
  const sum = Object.values(items).reduce(
    (prevVal, val) =>
      prevVal +
      val.reduce(
        (prevItem, item) =>
          prevItem +
          getCurrentPrice(symbol, item.data.prices).amount * item.quantity,
        0
      ),
    0
  );

  return sum.toFixed(2);
};

export const getCurrentPrice = (symbol, prices) => {
  const price = prices.find((price) => price.currency.symbol === symbol);

  return price;
};
