export const countDiscount = (data, count) => {
  data.forEach((element) => {
    element.discounts.forEach((result) => {
      if (!result.status) count++;
    });
  });
  return count;
};
export const amountDiscount = (data, count) => {
  data.forEach((element) => {
    element.discounts.forEach((result) => {
      if (result.status) count += result.amount;
    });
  });
  return count;
};
