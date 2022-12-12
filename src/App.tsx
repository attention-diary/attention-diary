import './main.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PostPage from './PostPage';
import EditPage from './EditPage';
import DetailPage from './DetailPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/edit/:id" element={<EditPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
    </Routes>
  );
}
