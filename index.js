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

const getUserAgent = () => {
  const nav = navigator.userAgent;
  const email = document.getElementById("email");
  const mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(nav);

  email.setAttribute(
    "href",
    mobile
      ? "mailto:javier.aparicio@claro.com.pe?subject=Calculo%20de%20perdidas&body=Hola%20Javier"
      : "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=javier.aparicio@claro.com.pe&su=Calculo%20de%20perdidas&body=Hola%20Javier"
  );
};

getUserAgent();

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
