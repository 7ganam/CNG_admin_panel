import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import Button from "@material-ui/core/Button";

function TableComponent(props) {
  console.log(props.rows.sort(() => 1));
  console.log(props.rows);
  return (
    <>
      <TableContainer component={Paper} style={{ overflow: "auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Plate </TableCell>
              <TableCell align="right">Latest&nbsp;maintainence</TableCell>
              <TableCell align="right">Remaining Days</TableCell>
              <TableCell align="right">QR string</TableCell>
              <TableCell align="right">Maintainer note</TableCell>
              <TableCell align="right">Maintenance period</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...props.rows].reverse().map((row) => {
              let str = row.maintenances[row.maintenances.length - 1];
              let date = moment(str);
              let last_maint_date = date.utc().format("DD-MM-YYYY");

              //calculating reamaing days for maintainance
              let current_date = moment();
              let date_diff = current_date.diff(date, "days");

              return (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.plate_no + "-" + row.plate_str}
                  </TableCell>
                  <TableCell align="right">{last_maint_date}</TableCell>
                  <TableCell align="right">
                    {date_diff <
                    (row?.maintenance_period || props.maintainance_period) ? (
                      (row?.maintenance_period || props.maintainance_period) -
                      date_diff
                    ) : (
                      <Button variant="outlined" color="error">
                        Needs maintainence
                      </Button>
                    )}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "right" }}
                  >
                    {row.qr_str}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "right" }}
                  >
                    {row?.maintainer_note ?? ""}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ textAlign: "right" }}
                  >
                    {row?.maintenance_period ?? ""}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default TableComponent;
