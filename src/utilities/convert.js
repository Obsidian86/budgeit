export const money = amount => {
  if (!parseFloat(amount)) {
    console.log("Error in money conversion");
    return "$00.00";
  }

  amount = parseFloat(amount).toFixed(2);
  let parts = amount.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return "$" + parts[0] + "." + parts[1];
};

export const percent = (amt, total) => {
  return `${((amt / total) * 100).toFixed(2)}%`;
};

export const getPercent = (amt, total) => {
  return (amt / 100) * total;
};

export const disRec = re => {
  const convRec = {
    w: "Per week",
    m: "Per month",
    y: "Per year",
    bw: "Bi-weekly"
  };
  return convRec[re] ? convRec[re] : re;
};

export const convert = (amount, rec = "m", disRec = "m", ...args) => {
  const year = {
    m: 12,
    w: 52,
    bw: 26,
    y: 1
  };

  amount = amount * year[rec];
  amount = amount / year[disRec];

  let returnVal = args.includes("money") ? money(amount) : amount;
  if (args.includes("appendRec")) {
    returnVal += ` ${disRec(disRec)}`;
  }

  return returnVal;
};
