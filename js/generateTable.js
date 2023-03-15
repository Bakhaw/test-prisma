import datasJSON from "./datas.json";
import filterDatas from "./filterDatas";

/**
 * Generate the <thead> dynamically using columns array and pass it to a specific table (tbl parameter)
 *
 * @param {*} tbl
 */
function generateTableHead(tbl) {
  const columns = [
    "",
    "Lastname",
    "Firstname",
    "Age",
    "Eye color",
    "Email",
    "Address",
    "Company",
  ];

  const tblHead = document.createElement("thead");
  const row = document.createElement("tr");

  columns.forEach((col) => {
    const cell = document.createElement("th");
    const cellText = document.createTextNode(col);
    cell.appendChild(cellText);
    row.appendChild(cell);
  });

  tblHead.appendChild(row);

  tbl.appendChild(tblHead);
}

/**
 * Generate every rows (<tr> & <td>) inside <tbody> based on a datas array
 *
 * @param {*} tbl
 * @param {array} datas
 */
function generateTableBody(tbl, datas) {
  const tblBody = document.createElement("tbody");

  datas.forEach((data) => {
    const row = document.createElement("tr");

    Object.values(data).forEach((val) => {
      const cell = document.createElement("td");

      if (val.type) {
        if (val.type === "img") {
          const img = document.createElement("img");
          img.src = val.value;
          cell.appendChild(img);
          row.appendChild(cell);
        }

        if (val.type === "div") {
          const div = document.createElement("div");
          div.className = `div-${val.value}`;
          cell.appendChild(div);
          row.appendChild(cell);
        }
      } else {
        const cellText = document.createTextNode(val);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
    });

    tblBody.appendChild(row);
  });

  tbl.appendChild(tblBody);
}

/**
 * Table initialization
 */
export default function generateTable() {
  const tbl = document.querySelector("#userTable");
  const filterJSON = filterDatas(datasJSON);

  // filtering datas to have an array that only contains values we are displaying
  const dataBody = filterJSON.map(
    ({ address, age, company, email, eyeColor, name, picture }) => ({
      picture: {
        type: "img",
        value: picture,
      },
      firstName: name.first,
      lastName: name.last,
      age,
      eyeColor: {
        type: "div",
        value: eyeColor,
      },
      email,
      address,
      company,
    })
  );

  generateTableHead(tbl);
  generateTableBody(tbl, dataBody);

  const app = document.querySelector(".app");
  app.appendChild(tbl);
}
