'use client';

import { useState } from 'react';
import { apiService } from '@/app/common/api/apiService';
import Message from '@/app/components/Message';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const fetchUsers = async () => {
    const response = await apiService.get<User[]>('/users');
    
    if (response.success) {
      setUsers(response.data);
      setMessage({ text: response.message, type: 'success' });
    } else {
      setMessage({ text: response.message, type: 'error' });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách người dùng</h1>
      
      <button 
        onClick={fetchUsers}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Tải danh sách
      </button>

      {message && (
        <Message 
          message={message.text}
          type={message.type}
          onClose={() => setMessage(null)}
        />
      )}

      <div className="mt-4">
        {users.map(user => (
          <div key={user.id} className="border p-4 mb-2 rounded">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}