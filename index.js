
const i_ds = document.getElementById("i_ds");
const i_us = document.getElementById("i_us");
const i_da = document.getElementById("i_da");
const o_ds = document.getElementById("o_ds");
const o_us = document.getElementById("o_us");
const calc = document.getElementById("calc");
const slc = document.getElementById("company");

const options = [
  "Cicsa Perú Sac",
  "Cobertura Total",
  "Comunicaciones Sur Peruana",
  "Dimera Servicios Multiples",
  "Inka Cell",
  "Niza Región Sur",
  "Telecomunicaciones Megatic",
  "Xtend"
];
let company = options[0]

options.forEach((optionText) => {
  const option = document.createElement("option");
  option.value = optionText;
  option.text = optionText;
  slc.add(option);
});


let ds = parseFloat(i_ds.value);
let us = parseFloat(i_us.value);
let da = parseFloat(i_da.value);

let ous;
let ods;

const getResults = (us, ds, da) => {
  ous = us >= 20 ? us + da * 0.05 : 0;
  ods = ds <= 25 ? ds - da * 0.16 : 0;
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
        "entry.1202637179": company,
      }),
      {
        mode: "no-cors",
      }
    );
  } catch (e) {
    console.log(e.message);
  }
}

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
  sendResults()
});

slc.addEventListener("change", () => {
  company = slc.value
  console.log(company)
});