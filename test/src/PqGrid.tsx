import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'pqgrid/pqgrid.min.css';
import 'pqgrid/pqgrid.min.js';
import axios from 'axios';

interface Data {
  id: number;
  name: string;
  age: number;
  country: string;
  city: string;
  address: string;
  zip: string;
  phone: string;
  email: string;
  company: string;
  position: string;
  salary: number;
  joinDate: string;
  department: string;
  status: string;
  cellColor: string;
  foreColor: string;
  foreSize: number;
  textAlign: number;
}

const PqGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:5001/data');
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const colModel = [
      { title: "ID", width: 50, dataIndx: "id" },
      { title: "Name", width: 150, dataIndx: "name" },
      { title: "Age", width: 50, dataIndx: "age" },
      { title: "Country", width: 100, dataIndx: "country" },
      { title: "City", width: 100, dataIndx: "city" },
      { title: "Address", width: 200, dataIndx: "address" },
      { title: "Zip", width: 100, dataIndx: "zip" },
      { title: "Phone", width: 150, dataIndx: "phone" },
      { title: "Email", width: 200, dataIndx: "email" },
      { title: "Company", width: 150, dataIndx: "company" },
      { title: "Position", width: 150, dataIndx: "position" },
      { title: "Salary", width: 100, dataIndx: "salary" },
      { title: "Join Date", width: 150, dataIndx: "joinDate" },
      { title: "Department", width: 150, dataIndx: "department" },
      { title: "Status", width: 100, dataIndx: "status" }
    ];

    if (gridRef.current) {
      const $grid = $(gridRef.current) as any;
      $grid.pqGrid({
        width: 'auto',
        height: '1000',
        dataModel: { data: data },
        colModel: colModel,
        selectionModel: { type: 'cell' },
        editable: true,
        cellSave: (evt: any, ui: any) => {
          const updatedData = [...data];
          const rowIndx = ui.rowIndx;
          const dataIndx = ui.dataIndx as keyof Data;
          const newVal = ui.newVal;

          if (rowIndx >= 0 && dataIndx) {
            const updatedRow = { ...updatedData[rowIndx], [dataIndx]: newVal };
            updatedData[rowIndx] = updatedRow;
            setData(updatedData);
            console.log('Updated Data:', updatedData);
          }
        },
        render: (evt: any, ui: any) => {
          const { rowData, dataIndx, $cell } = ui;
          if (rowData && $cell) {
            const cellColor = rowData.cellColor;
            const foreColor = rowData.foreColor;
            const foreSize = rowData.foreSize;
            const textAlign = rowData.textAlign;

            if (cellColor) {
              $cell.css("background-color", `#${cellColor}`);
            }
            if (foreColor) {
              $cell.css("color", `#${foreColor}`);
            }
            if (foreSize) {
              $cell.css("font-size", `${foreSize}px`);
            }
            if (textAlign) {
              let align = "left";
              if (textAlign === 2) align = "center";
              if (textAlign === 3) align = "right";
              $cell.css("text-align", align);
            }
          }
        }
      });
    }

    return () => {
      if (gridRef.current) {
        const $grid = $(gridRef.current) as any;
        $grid.pqGrid('destroy');
      }
    };
  }, [data]);

  return <div ref={gridRef} style={{ margin: '20px' }}></div>;
};

export default PqGrid;
