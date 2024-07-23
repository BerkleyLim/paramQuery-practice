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
