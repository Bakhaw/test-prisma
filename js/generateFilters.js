import getURLParams from "./getURLParams";

/**
 * Add/update a query parameter in the URL
 *
 * @param {string} key
 * @param {string} value
 */
function insertUrlParam(key, value) {
  var searchParams = new URLSearchParams(window.location.search);
  searchParams.set(key, value);
  window.location.search = searchParams.toString();
}

/**
 * Update the <select> tag and make it correspond to the active query parameter
 *
 * @param {URLSearchParams} urlParams
 */
function updateEyeColorSelectedOption(urlParams) {
  const eyeColorParams = ["blue", "brown", "green"];

  if (eyeColorParams.includes(urlParams.eyeColor)) {
    const el = document.querySelector("#eyeColorSelect");
    el.value = urlParams.eyeColor;
  }
}

/**
 * Update the <select> tag and make it correspond to the active query parameter
 *
 * @param {URLSearchParams} urlParams
 */
function updateAgeSelectedOption(urlParams) {
  const ageParams = ["20,25", "26,30", "31,35", "36,40"];

  if (ageParams.includes(urlParams.age)) {
    const el = document.querySelector("#ageSelect");
    el.value = urlParams.age;
  }
}

/**
 * Initialize events listener so we can update the query parameters in the URL whenever the <select> tag value changes
 */
function initFilterEvents() {
  const eyeColorSelect = document.getElementById("eyeColorSelect");
  const ageSelect = document.getElementById("ageSelect");

  eyeColorSelect.addEventListener("change", (e) => {
    if ("URLSearchParams" in window) {
      insertUrlParam("eyeColor", e.target.value);
    }
  });

  ageSelect.addEventListener("change", (e) => {
    if ("URLSearchParams" in window) {
      insertUrlParam("age", e.target.value);
    }
  });
}

/**
 * Filters initialization
 */
export default function generateFilters() {
  const urlParams = getURLParams();

  if (urlParams.eyeColor) {
    updateEyeColorSelectedOption(urlParams);
  }

  if (urlParams.age) {
    updateAgeSelectedOption(urlParams);
  }

  initFilterEvents();
}
