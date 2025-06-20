import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');
  
  // 1. Delete all existing snippets
  await prisma.snippet.deleteMany({});
  console.log('Deleted all snippets.');

  // 2. Create new snippets
  const snippets = [
    {
      title: 'React Hooks: useState',
      code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
      tags: JSON.stringify(['react', 'hooks', 'useState']),
    },
    {
      title: 'JavaScript: Async/Await Fetch',
      code: `async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// Example usage:
fetchData('https://api.github.com/users/octocat')
  .then(data => console.log(data));`,
      tags: JSON.stringify(['javascript', 'async', 'fetch', 'api']),
    },
    {
        title: 'Python: Flask Hello World',
        code: `from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)`,
        tags: JSON.stringify(['python', 'flask', 'web']),
    },
    {
        title: 'Next.js: API Route',
        code: `// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' });
}`,
        tags: JSON.stringify(['nextjs', 'api', 'javascript']),
    },
    {
        title: 'SQL: Select with Join',
        code: `SELECT
    Users.name,
    Orders.order_date
FROM
    Users
INNER JOIN
    Orders ON Users.id = Orders.user_id;`,
        tags: JSON.stringify(['sql', 'database', 'join']),
    },
  ];

  for (const snippet of snippets) {
    await prisma.snippet.create({
      data: snippet,
    });
  }
  
  console.log(`Seeded ${snippets.length} snippets.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 