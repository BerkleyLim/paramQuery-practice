// src/PqGrid.tsx

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
}

const PqGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    // API에서 데이터 가져오기
    const fetchData = async () => {
      const result = await axios('http://localhost:5001/data');
      setData(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(data)
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
      ($(gridRef.current) as any).pqGrid({
        width: 'auto',
        height: '1000',
        dataModel: { data: data },
        colModel: colModel,
        selectionModel: { type: 'cell' }, // 셀 선택 활성화
        editable: true // 셀 편집 활성화
      });
    }

    return () => {
      if (gridRef.current) {
        ($(gridRef.current) as any).pqGrid('destroy');
      }
    };
  }, [data]);

  return <div ref={gridRef} style={{ margin: '20px' }}></div>;
};

export default PqGrid;
