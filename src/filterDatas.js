import getURLParams from "./getURLParams";

/**
 * Know if "baseAge" is between "minAge" & "maxAge" (or equal)
 *
 * @param {number} baseAge
 * @param {number} minAge
 * @param {number} maxAge
 * @returns {boolean};
 */
function validateAgeRange(baseAge, minAge, maxAge) {
  return baseAge >= minAge && baseAge <= maxAge;
}

/**
 * Filter datas from JSON using the query parameters on the browser
 *
 * @param {array} datas
 * @returns {array}
 */
export default function filterDatas(datas) {
  const urlParams = getURLParams();
  const eyeColorParams = ["blue", "brown", "green"];
  const ageParams = ["20,25", "26,30", "31,35", "36,40"];

  const isValidEyeColorParam = eyeColorParams.includes(urlParams.eyeColor);
  const isValidAgeParam = ageParams.includes(urlParams.age);

  const filteredDatas = datas.filter((data) => {
    if (urlParams.eyeColor && urlParams.age) {
      if (isValidEyeColorParam && isValidAgeParam) {
        const [minAge, maxAge] = urlParams.age.split(",");

        return (
          data.eyeColor === urlParams.eyeColor &&
          validateAgeRange(data.age, minAge, maxAge)
        );
      }
    }

    if (urlParams.eyeColor) {
      if (isValidEyeColorParam) {
        return data.eyeColor === urlParams.eyeColor;
      }
    }

    if (urlParams.age) {
      if (isValidAgeParam) {
        const [minAge, maxAge] = urlParams.age.split(",");
        return validateAgeRange(data.age, minAge, maxAge);
      }
    }

    return data;
  });

  return filteredDatas;
}
