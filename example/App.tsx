import ReacthtmlToexcel from "@veritem/react-html-excel";
import React from "react";

export function App() {
  return (
    <section>
      <ReacthtmlToexcel
        className="download-table-xls-button"
        table="table"
        filename="table"
        sheet="table"
        extension="xls"
        buttonText="Download"
      />
      <table id="table">
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Age</th>
        </tr>

        <tr>
          <td>Jill</td>
          <td>Smith</td>
          <td>50</td>
        </tr>
        <tr>
          <td>Eve</td>
          <td>Jackson</td>
          <td>94</td>
        </tr>
      </table>
    </section>
  );
}
