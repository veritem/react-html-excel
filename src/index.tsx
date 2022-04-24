import React from "react";

interface IProps {
  table: string;
  filename: string;
  sheet: string;
  className: string;
  buttonText: string;
}

export default function HtmlToExecl({
  table,
  filename,
  sheet,
  className = "button-download",
  buttonText = "Download",
}: IProps) {
  const values = { table, filename, sheet };

  function base64(s) {
    return window.btoa(decodeURIComponent(encodeURIComponent(s)));
  }

  function format(s, c) {
    return s.replace(/{(\w+)}/g, (m, p) => c[p]);
  }

  function handleDownload() {
    if (!document) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Failed to access document object");
      }
      return;
    }

    if (
      document.getElementById(values.table).nodeType !== 1 ||
      document.getElementById(values.table).nodeName !== "TABLE"
    ) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Provided table property is not html table element");
      }

      return;
    }

    const table = document.getElementById(values.table).outerHTML;
    const sheet = String(values.sheet);
    const filename = `${String(values.filename)}.xls`;
    const uri = "data:application/vnd.ms-excel;base64,";
    const template =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-mic' +
      'rosoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta cha' +
      'rset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Exce' +
      "lWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>" +
      "</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></" +
      "xml><![endif]--></head><body>{table}</body></html>";

    const context = {
      worksheet: sheet || "Worksheet",
      table,
    };

    const element = document.createElement("a");
    element.href = uri + base64(format(template, context));
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <button className={className} type="button" onClick={handleDownload}>
      {buttonText}
    </button>
  );
}
