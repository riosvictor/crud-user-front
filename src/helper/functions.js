import moment from "moment";

export function formatData(dataObject) {
  var dia = dataObject.getDate().toString().padStart(2, "0"),
    mes = (dataObject.getMonth() + 1).toString().padStart(2, "0"),
    ano = dataObject.getFullYear();

  return `${ano}-${mes}-${dia}`;
}

export function showDataFromDB(string) {
  var date = moment(string).format("DD/MM/YYYY");

  return date;
}

export function saveDataToDB(string) {
  var date = moment(string, "DD/MM/YYYY").format("YYYY-MM-DD");

  return date;
}
