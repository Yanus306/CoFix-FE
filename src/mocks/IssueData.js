export const mockIssues = [
  {
    id: 1,
    badge: "성능 저하 우려",
    title: "과도한 개별 상태(State) 선언",
    description: "연관된 데이터(이메일, 비밀번호 등)를 각각 독립된 ‘useState’로 관리하면, 업데이트 시 불필요한 리렌더링이 여러 번 발생할 수 있습니다.",
    tags: ['React 상태 관리', '렌더링 최적화', '객체 리터럴 묶음'],
    code: `function UserForm() {\n  const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');\n  const [name, setName] = useState('');\n  const [age, setAge] = useState('');\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    // 데이터 전송 로직\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      {/* 폼 입력 요소들 */}\n    </form>\n  );\n}`
  },
  {
    id: 2,
    badge: "무한 루프 위험",
    title: "useEffect 의존성 배열 누락",
    description: "의존성 배열을 생략하면 컴포넌트가 렌더링될 때마다 useEffect가 실행되어 무한 루프에 빠지거나 성능이 크게 저하될 수 있습니다.",
    tags: ['React Hooks', 'useEffect', '생명주기'],
    code: `import { useEffect, useState } from 'react';\n\nfunction DataFetcher() {\n  const [data, setData] = useState(null);\n\n  useEffect(() => {\n    fetch('https://api.example.com/data')\n      .then(res => res.json())\n      .then(result => setData(result));\n  }); // 🚨 빈 배열([])이 빠져있습니다.\n\n  return <div>{data ? data.title : '로딩중...'}</div>;\n}`
  }
];