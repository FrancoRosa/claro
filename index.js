const i_ds = document.getElementById("i_ds");
const i_us = document.getElementById("i_us");
const i_da = document.getElementById("i_da");
const o_ds = document.getElementById("o_ds");
const o_us = document.getElementById("o_us");
const calc = document.getElementById("calc");
const splt = document.getElementById("splt");
const slc = document.getElementById("company");
const msg_ont = document.getElementById("msg_ont");

const calc_ffth = document.getElementById("calc_ffth");
const drop = document.getElementById("drop");
const ftth_ont = document.getElementById("ftth_ont");
const ftth_optic = document.getElementById("ftth_optic");

let latitude = 0;
let longitude = 0;

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  });
} else {
  /* geolocation IS NOT available */
}

const options = [
  "Claro Peru",
  "Cicsa Perú Sac",
  "Cobertura Total",
  "Comunicaciones Sur Peruana",
  "Dimera Servicios Multiples",
  "Inka Cell",
  "Niza Región Sur",
  "Telecomunicaciones Megatic",
  "Xtend",
  "Web Solution",
  "Fibercom",
  "Red Bussines",
];
let company = options[0];

options.forEach((optionText) => {
  const option = document.createElement("option");
  option.value = optionText;
  option.text = optionText;
  slc.add(option);
});

let ds = parseFloat(i_ds.value);
let us = parseFloat(i_us.value);
let da = parseFloat(i_da.value);
let sp = 0;

let ous;
let ods;

const getResults = (us, ds, da) => {
  ous = us >= 20 ? us + da * 0.05 : 0;
  ods = ds <= 25 ? ds - da * 0.16 : 0;
  ous = ous + 3.5 * sp;
  ods = ods - 3.5 * sp;
  o_us.innerText = ous.toFixed(2);
  o_ds.innerText = ods.toFixed(2);
  if (ous >= 50) o_us.classList.add("bad");
  else o_us.classList.remove("bad");

  if (ods <= -4) o_ds.classList.add("bad");
  else o_ds.classList.remove("bad");
};

const sendResults = async () => {
  try {
    await fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSeqJexJO8wcrZ6qjMPdrZQU1x7S9BsBW8U6CA7VTm_CqYdAQQ/formResponse?" +
        new URLSearchParams({
          "entry.1293228006": ds,
          "entry.813637407": us,
          "entry.1773134115": da,
          "entry.571625077": ous.toFixed(2),
          "entry.639341194": ods.toFixed(2),
          "entry.579270890": sp,
          "entry.1202637179": company,
        }),
      {
        mode: "no-cors",
      }
    );
  } catch (e) {
    console.log(e.message);
  }
};

const sendResultsFTTH = async () => {
  console.log("...sending ftth");
  try {
    await fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSfncpVPWvfvp30raOmTQ97lgF3mmTGuHvPLTZ0JV8cWhv7ccw/formResponse?" +
        new URLSearchParams({
          "entry.1293228006": ffth_rx.value,
          "entry.813637407": drop.value,
          "entry.571625077": ftth_optic.innerHTML,
          "entry.639341194": ftth_ont.innerHTML,
          "entry.1202637179": company,
          "entry.870382746": latitude,
          "entry.179225676": longitude,
        }),
      {
        mode: "no-cors",
      }
    );
    console.log("...done ftth");
  } catch (e) {
    console.log(e.message);
  }
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

calc.addEventListener("click", () => {
  ds = parseFloat(i_ds.value);
  us = parseFloat(i_us.value);
  da = parseFloat(i_da.value);
  getResults(us, ds, da);
  sendResults();
});

slc.addEventListener("change", () => {
  company = slc.value;
  console.log(company);
});

splt.addEventListener("click", () => {
  sp++;
  if (sp > 3) sp = 0;
  splt.innerText = `Splitters ${sp}`;
  company = slc.value;
  console.log(company);
});

calc_ffth.addEventListener("click", () => {
  const rx = parseFloat(ffth_rx.value);
  let ont;
  let optic;
  switch (drop.value) {
    case "50":
      optic = rx - 0.1;
      ont = rx - 0.1 - 0.5;
      break;
    case "80":
      optic = rx - 0.16;
      ont = rx - 0.16 - 0.5;
      break;
    case "100":
      optic = rx - 0.2;
      ont = rx - 0.2 - 0.5;
      break;
    case "150":
      optic = rx - 0.3;
      ont = rx - 0.3 - 0.5;
      break;
    case "220":
      optic = rx - 0.44;
      ont = rx - 0.44 - 0.5;
      break;
    case "300":
      optic = rx - 0.6;
      ont = rx - 0.6 - 0.5;
      break;
    default:
      break;
  }

  ftth_optic.innerText = optic.toFixed(3);
  ftth_ont.innerText = ont.toFixed(3);

  if (ont <= -25) ftth_ont.classList.add("bad");
  else ftth_ont.classList.remove("bad");
  if (optic <= -25) ftth_optic.classList.add("bad");
  else ftth_optic.classList.remove("bad");
  sendResultsFTTH();
});
