'use client';

import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function Home() {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [users, setUsers] = useState<User[]>([]);

  // async function fetchUsers() {
  //   const rs = await fetch('/api/users');
  //   const data = await rs.json();
  //   setUsers(data);
  // }

  // async function fetchPosts() {
  //   const res = await fetch('/api/post');
  //   const data = await res.json();
  //   setPosts(data);

  //   console.log(data);
  // }

  // useEffect(() => {
  //   fetchUsers();
  //   fetchPosts();
  // }, []);

  return (
    <div>

    </div>
  );
}
