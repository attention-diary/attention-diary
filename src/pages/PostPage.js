
import { useNavigate,useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { __postPosts } from "../redux/thunk/thunk";

import "../pages/india.css";

import Form from '../components/Form';
import PostButton from '../components/PostButton';
import Lottie from 'lottie-react';
import { posting_image } from '../assets';



const PostPage = () => {
  // useEffect로 success가 true일때 홈으로 보내기
  const navigate = useNavigate();

  const { state } = useLocation();
  const editedPost = useSelector(state => state.indiaReducer);

  return (
    <> 
      <div class="headerwrap_post">
        <div className="header">
          <h1 className="logo_post">
            <a href="/">Logo</a>
          </h1>
        </div>
        <div className="posting_image">
            <Lottie animationData={posting_image} />
        </div>
      </div>


      <div className='form-wrapper'>
        <div class="post_form">
          <h2>관심이 필요한 오늘을 기록해주세요</h2>
          <Form />
          <button
            className='btn-secondary'
            onClick={() => {
              navigate(-1);
            }}
          >
            이전으로
          </button>
          <PostButton
            editedPost={editedPost}
            currPost={state}
          />
        </div>
      </div>
      <div className="bg"></div>
    </>
  );
};

export default PostPage;
