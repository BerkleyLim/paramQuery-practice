// src/PqGrid.tsx

import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'pqgrid/pqgrid.min.css';
import 'pqgrid/pqgrid.min.js';

const PqGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = [
      { rank: 1, name: 'John', age: 28 },
      { rank: 2, name: 'Anna', age: 22 },
      { rank: 3, name: 'Peter', age: 35 }
    ];

    const colModel = [
      { title: "Rank", width: 100, dataIndx: "rank" },
      { title: "Name", width: 200, dataIndx: "name" },
      { title: "Age", width: 100, dataIndx: "age" }
    ];

    if (gridRef.current) {
      ($(gridRef.current) as any).pqGrid({
        width: 'auto',
        height: 400,
        dataModel: { data: data },
        colModel: colModel,
        selectionModel: { type: 'cell' }, // 셀 선택 활성화
        editable: true // 셀 편집 활성화
      });
    }

    return () => {
      // 컴포넌트 언마운트 시 그리드를 파괴합니다.
      if (gridRef.current) {
        ($(gridRef.current) as any).pqGrid('destroy');
      }
    };
  }, []);

  return (
    <div ref={gridRef} style={{ margin: '20px' }}></div>
  );
}

export default PqGrid;
