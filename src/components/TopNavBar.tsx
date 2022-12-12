import React from 'react';

import { Link } from 'react-router-dom';

export default function TopNavBar() {
  return (
    <div className='top-nav-bar'>
      <Link to='/'>
        <p>Logo</p>
      </Link>
      <Link to='/post'>일기장 작성페이지로 이동</Link>
    </div>
  );
}
