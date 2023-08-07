import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
//import { Link } from "react-router-dom";

const DataTable = ({onEdit, slug, columns, rows, onDelete}) => {
  
  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="action">
          <button onClick={() => {
            console.log(params.row.id);
            const id = params.row.id;
            onEdit(id);
            }}>
            <img src="images/view.svg" alt="" />
          </button>
          <div className="delete" onClick={() => {
            console.log(params.row.id);
            const id = params.row.id;
            onDelete(id);
            }}>
            <img src="images/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        components={{
          Toolbar: GridToolbar,
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
