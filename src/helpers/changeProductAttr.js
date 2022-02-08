export const setIsCheckedParam = (p) => {
  const product = JSON.parse(JSON.stringify(p));

  return {
    ...product,
    attributes: product.attributes.map((attr) => ({
      ...attr,
      items: attr.items.map((item, index) => ({
        ...item,
        isChecked: !index ? true : false,
      })),
    })),
  };
};
