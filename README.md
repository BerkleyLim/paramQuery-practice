# paramQuery-practice
paramQuery 연습용 프로젝트


## paramQuery 설치 법
네, 맞습니다. `pqgrid`는 별도의 패키지로 설치할 수 있습니다. 이를 위해 `npm install pqgrid`를 사용하면 됩니다. 그러면 해당 라이브러리를 React 프로젝트에 통합할 수 있습니다.

다음은 TypeScript와 React 프로젝트에서 `pqgrid`를 사용하는 방법입니다.

### 1. React 프로젝트 생성

먼저 TypeScript를 사용하여 React 프로젝트를 생성합니다. Create React App을 TypeScript 템플릿으로 초기화할 수 있습니다.

```bash
npx create-react-app my-react-app --template typescript
cd my-react-app
```

### 2. 필요한 패키지 설치

다음으로 jQuery와 pqgrid를 설치합니다.

```bash
npm install jquery pqgrid
```

TypeScript에서 jQuery를 사용하기 위해 타입 정의 파일도 설치합니다.

```bash
npm install @types/jquery
```

### 3. pqGrid 컴포넌트 작성

React와 TypeScript를 사용하여 pqGrid를 설정하는 방법입니다. `src` 디렉토리에 `PqGrid.tsx` 파일을 생성하고 다음과 같이 작성합니다.

```tsx
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
```

### 4. PqGrid 컴포넌트를 App 컴포넌트에 추가

`src/App.tsx` 파일을 열고 PqGrid 컴포넌트를 추가합니다.

```tsx
// src/App.tsx

import React from 'react';
import './App.css';
import PqGrid from './PqGrid';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>pqGrid with React and TypeScript</h1>
      </header>
      <PqGrid />
    </div>
  );
}

export default App;
```

### 5. 애플리케이션 실행

이제 프로젝트를 실행하여 pqGrid 그리드를 확인할 수 있습니다.

```bash
npm start
```

브라우저에서 `http://localhost:3000`으로 이동하여 pqGrid 그리드가 제대로 렌더링되는지 확인합니다.

이 방법을 통해 React와 TypeScript 환경에서 jQuery와 pqGrid를 사용하는 컴포넌트를 작성할 수 있습니다. `as any`를 사용하여 jQuery 플러그인의 타입을 무시했지만, 가능하다면 jQuery 플러그인의 타입 정의를 작성하여 타입 안전성을 높이는 것도 좋은 방법입니다.


## JSON-SERVER 활용 법

### 1. `json-server` 설치

먼저 `json-server`를 전역으로 설치합니다.

```bash
npm install -g json-server
```

### 2. 샘플 데이터 생성

다음으로, 샘플 데이터를 생성하는 스크립트를 작성합니다. 프로젝트 루트 디렉토리에 `generateData.js` 파일을 생성합니다.

```javascript
// generateData.js

const fs = require('fs');

const generateRandomData = (id) => {
  return {
    id,
    name: `Name${id}`,
    age: Math.floor(Math.random() * 100),
    country: `Country${Math.floor(Math.random() * 100)}`,
    city: `City${Math.floor(Math.random() * 100)}`,
    address: `Address${Math.floor(Math.random() * 1000)}`,
    zip: `Zip${Math.floor(Math.random() * 10000)}`,
    phone: `Phone${Math.floor(Math.random() * 10000)}`,
    email: `email${id}@example.com`,
    company: `Company${Math.floor(Math.random() * 100)}`,
    position: `Position${Math.floor(Math.random() * 100)}`,
    salary: Math.floor(Math.random() * 100000),
    joinDate: new Date().toISOString(),
    department: `Department${Math.floor(Math.random() * 50)}`,
    status: Math.random() > 0.5 ? 'Active' : 'Inactive'
  };
};

const data = Array.from({ length: 2000 }, (_, index) => generateRandomData(index + 1));

fs.writeFileSync('db.json', JSON.stringify({ data }, null, 2));
```

이 스크립트를 실행하여 `db.json` 파일을 생성합니다.

```bash
node generateData.js
```

### 3. `json-server` 실행

이제 `json-server`를 실행하여 API 서버를 시작합니다.

```bash
json-server --watch db.json --port 5000
```

`json-server`가 `db.json` 파일을 기반으로 RESTful API를 제공합니다. 예를 들어, `http://localhost:5000/data`에서 데이터를 확인할 수 있습니다.

### 4. React 프로젝트 설정

이제 React 프로젝트를 설정하여 `pqGrid`를 사용하여 데이터를 가져오고 표시합니다.

#### 4.1. React 프로젝트 생성

먼저 TypeScript를 사용하여 React 프로젝트를 생성합니다.

```bash
npx create-react-app my-react-app --template typescript
cd my-react-app
```

#### 4.2. 필요한 패키지 설치

다음으로 jQuery와 pqgrid를 설치합니다.

```bash
npm install jquery pqgrid
```

TypeScript에서 jQuery를 사용하기 위해 타입 정의 파일도 설치합니다.

```bash
npm install @types/jquery
```

#### 4.3. `PqGrid` 컴포넌트 작성

React와 TypeScript를 사용하여 `pqGrid`를 설정하고 API에서 데이터를 가져오는 방법입니다. `src` 디렉토리에 `PqGrid.tsx` 파일을 생성하고 다음과 같이 작성합니다.

```tsx
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
      const result = await axios('http://localhost:5000/data');
      setData(result.data);
    };

    fetchData();

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
  }, [data]);

  return (
    <div ref={gridRef} style={{ margin: '20px' }}></div>
  );
}

export default PqGrid;
```

#### 4.4. `PqGrid` 컴포넌트를 `App` 컴포넌트에 추가

`src/App.tsx` 파일을 열고 `PqGrid` 컴포넌트를 추가합니다.

```tsx
// src/App.tsx

import React from 'react';
import './App.css';
import PqGrid from './PqGrid';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>pqGrid with React and TypeScript</h1>
      </header>
      <PqGrid />
    </div>
  );
}

export default App;
```

### 5. 애플리케이션 실행

이제 프로젝트를 실행하여 `pqGrid` 그리드가 API로부터 데이터를 받아와서 표시하는지 확인할 수 있습니다.

```bash
npm start
```

브라우저에서 `http://localhost:3000`으로 이동하여 `pqGrid` 그리드가 제대로 렌더링되고 2000개의 데이터가 표시되는지 확인합니다.

이 방법을 통해 React와 TypeScript 환경에서 jQuery와 `pqGrid`를 사용하는 컴포넌트를 작성하고, API로부터 데이터를 받아와서 표시할 수 있습니다.