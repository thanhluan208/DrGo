export const localStorageFunc =
  typeof window !== "undefined" ? window.localStorage : undefined;

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const convertPstToOptions = (pst) => {
  const options = [];
  pst.forEach((item) => {
    const parsedItem = JSON.parse(item.text);
    options.push({
      value: item.id,
      label: parsedItem.name,
    });
  });

  return options;
};
