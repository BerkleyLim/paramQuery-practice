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
    status: Math.random() > 0.5 ? 'Active' : 'Inactive',
    cellColor: Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'), // 랜덤 색상
    foreColor: Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'), // 랜덤 글꼴 색상
    foreSize: Math.floor(Math.random() * 10) + 10, // 10에서 20 사이의 랜덤 글꼴 크기
    textAlign: Math.floor(Math.random() * 3) + 1 // 1 (left), 2 (center), 3 (right) 중 하나
  };
};

const data = Array.from({ length: 2000 }, (_, index) => generateRandomData(index + 1));

fs.writeFileSync('db.json', JSON.stringify({ data }, null, 2));

console.log('db.json 파일이 생성되었습니다.');

// 설정 후 node generateData.js 명령어 입력
