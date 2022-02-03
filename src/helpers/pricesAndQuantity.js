export const getTotalPrice = (items, symbol) => {
  let totalQuantity = 0;
  let totalPrice = 0;

  for (let value of Object.values(items)) {
    for (let item of value) {
      totalPrice =
        totalPrice +
        getCurrentPrice(symbol, item.data.prices).amount * item.quantity;
      totalQuantity = totalQuantity + item.quantity;
    }
  }

  return {
    totalQuantity: totalQuantity,
    totalPrice: totalPrice.toFixed(2),
  };
};

export const getCurrentPrice = (symbol, prices) => {
  const price = prices.find((price) => price.currency.symbol === symbol);

  return price;
};
