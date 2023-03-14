import datasJSON from "./datas.json";
import filterDatas from "./filterDatas";

/**
 * Generate the <thead> dynamically using columns array and pass it to a specific table (tbl parameter)
 *
 * @param {*} tbl
 */
function generateTableHead(tbl) {
  const columns = [
    "Nom",
    "Prénom",
    "Âge",
    "Couleur des yeux",
    "Email",
    "Adresse",
    "Entreprise",
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
      const cellText = document.createTextNode(val);
      cell.appendChild(cellText);
      row.appendChild(cell);
    });

    tblBody.appendChild(row);
  });

  tbl.appendChild(tblBody);
}

/**
 * Table initialization
 */
export default function generateTable() {
  const tbl = document.createElement("table");
  const filterJSON = filterDatas(datasJSON);

  // filtering datas to have an array that only contains values we are displaying
  const dataBody = filterJSON.map(
    ({ name, age, eyeColor, email, address, company }) => ({
      firstName: name.first,
      lastName: name.last,
      age,
      eyeColor,
      email,
      address,
      company,
    })
  );

  generateTableHead(tbl);
  generateTableBody(tbl, dataBody);

  document.body.appendChild(tbl);
  tbl.setAttribute("border", "1");
}
