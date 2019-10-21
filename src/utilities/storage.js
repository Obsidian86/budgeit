export const save = data => {
  // localStorage.setItem("bData", JSON.stringify(data));
};

export const load = () => {
  return null
  const bData = localStorage.getItem("bData");
  if (bData) return JSON.parse(bData);
  else return null;
};
