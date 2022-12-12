import React from 'react';

import { Link } from 'react-router-dom';

import { Post } from '../types/Types';

type ListProps = { posts: Post[] }

// posts 배열을 받는다.
export default function List({ posts }: ListProps) {
  return (
    <>
      <ul className='tasks-box'>
        {posts.map(post => (
          <li key={post.id} >
            <h2>{post.title}</h2>
            <Link to={`/detail/${post.id}`}>
              <p>See More</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
