console.log("cool");
const i_ds = document.getElementById("i_ds");
const i_us = document.getElementById("i_us");
const i_da = document.getElementById("i_da");
const o_ds = document.getElementById("o_ds");
const o_us = document.getElementById("o_us");

let ds = parseFloat(i_ds.value);
let us = parseFloat(i_us.value);
let da = parseFloat(i_da.value);

const getResults = (us, ds, da) => {
  const ous = us >= 20 ? us + da * 0.05 : 0;
  const ods = ds <= 25 ? ds - da * 0.16 : 0;
  o_us.innerText = ous.toFixed(2);
  o_ds.innerText = ods.toFixed(2);
  if (ous >= 50) o_us.classList.add("bad");
  else o_us.classList.remove("bad");

  if (ods <= -4) o_ds.classList.add("bad");
  else o_ds.classList.remove("bad");
};

i_ds.addEventListener("input", () => {
  ds = parseFloat(i_ds.value);
  getResults(us, ds, da);
});

i_us.addEventListener("input", () => {
  us = parseFloat(i_us.value);
  getResults(us, ds, da);
});

i_da.addEventListener("input", () => {
  da = parseFloat(i_da.value);
  getResults(us, ds, da);
});

getResults(us, ds, da);
