import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// india
import { fetchGetPost } from '../redux/thunk/indiaThunk';
import List from '../components/List';

// lydia
import { __getPosts } from "../redux/thunk/thunk";
import "./reset.css"
import "./style.css"
import Lottie from 'lottie-react';
import { hero_image1 } from '../assets';
import { hero_image2 } from '../assets';
import { loading } from '../assets';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, isLoading, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(__getPosts());
  }, [dispatch]);

  const goWrite = (e) => {
    navigate("/postPage", { state: post });
  };

  const goDetailHandler = (post) => () => {
    navigate(`/detailPage/:id=${post.id}`, { state: post });
  };

  if (isLoading) {
    return <div className="loading">
      <Lottie animationData={loading} />
    </div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div class="headerwrap">
        <div className="bgcolour"></div>
        <div className="header">
          <h1 className="logo">
            <a href="">Logo</a>
          </h1>
          <button onClick={goWrite} className="diary">기록하기</button>
        </div>
      </div>
      <div className="heroside">
        <div className="hero_text">
          <h3>
            자랑하고 싶은 <br>
            </br>오늘이 있었나요?
          </h3>
          <h5>
            오픈 다이어리에서 당신의 오늘을 기록해주세요!
          </h5>
          <button onClick={goWrite} className="diary">
            기록하기
          </button>
        </div>
        <div id="hero_image">
          <div className="hero_image1">
            <Lottie animationData={hero_image1} />
          </div>
          <div className="hero_image2">
            <Lottie animationData={hero_image2} />
          </div>
        </div>
      </div>

      {/* <div className="section1">
        <div className="section1_title">
          <h3>둘러보기</h3>
          <p>다른 사람들의 오늘을 구경해보세요!</p>
        </div>
        <div className="section1_card">
          <div className="card_wrap">
            <div className="card_img">
              <div className="img"></div>
            </div>
            <div className="card_body">
              <h4>title</h4>
              <p onClick={goDetailHandler(post)} key={post.id}>{`읽어보기 >`}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section2">
        <div className="section2_title">
          <h3>최신순</h3>
          <p>따끈따끈한 다이어리에 관심을 주세요!</p>
          ddddd
        </div>
      </div>
      <div className="section3">
        <div className="section3_title">
          <h3>인기순</h3>
          <p>가장 많은 관심을 받고 있는 다이어리</p>
        </div>
      </div> */}
      <div className='carousel-container'>
        <div className='carousel-title'>
          <h2>둘러보기</h2>
          <p>다른 사람들의 오늘을 구경해보세요 !</p>
        </div>
        {post ? <List posts={post} /> : null}
      </div>
      <footer id="footerwrap">
        <div class="footer">
          <div className="bgcolour2"></div>
          <div class="logo">
            <h1><a href="#!">LOGO</a></h1>
          </div>
          <div class="footerend">
            <ul class="footer1 clearfix">
              <h4>Product</h4>
              <li><a href="#">EMPLOYEE DATABASE</a></li>
              <li><a href="#">PAYROLL</a></li>
              <li><a href="#">ABSENCES</a></li>
              <li><a href="#">SHIFT PLANNER</a></li>
              <li><a href="#">RECRUITING</a></li>
            </ul>
            <ul class="footer2 clearfix">
              <h4>Information</h4>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">BLOG</a></li>
              <li><a href="#">SUPPORT</a></li>
            </ul>
            <ul class="footer3 clearfix">
              <h4>Company</h4>
              <li><a href="#">ABOUT US</a></li>
              <li><a href="#">CAREERS</a></li>
              <li><a href="#">CONTACT US</a></li>
            </ul>
          </div>
          <div className="footerend_1">
            <ul className="clearfix">
              <li><a href="#">Terms</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
          <div className="footerend_2">
            <ul className="clearfix">
              <li><a href="https://github.com/attention-diary" className="github">github</a></li>
              <li><a href="https://www.figma.com/file/5PrswdP5LueSIUPm7NCFmd/%EC%98%A4%ED%94%88-%EB%8B%A4%EC%9D%B4%EC%96%B4%EB%A6%AC?node-id=0%3A1&t=DLqYsAdK2ALI7qQF-1" className="figma">figma</a></li>
              <li><a href="https://teamsparta.notion.site/4-7982bdfb5744440abcde00cb0f4f38ed" className="notion">notion</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
