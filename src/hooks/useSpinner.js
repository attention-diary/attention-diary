import { useEffect, useRef, useState } from "react";

const useSpinner = () => {
  const [limitScroll, setLimitScroll] = useState(630); //댓글3번째의 스크롤값?
  const [scrollY, setScrollY] = useState(0); //스크롤값 저장하기 위한 상태
  const commentIndex = useRef(3); //댓글3개씩 보여주기위한 ref값
  const commentIsLoding = useRef(false); //댓글3개를 불러올때 사용할 isloding값

  const handleFollow = () => {
    setScrollY(window.pageYOffset); //window 스크롤 값을 ScrollY에 저장
  };

  useEffect(() => {
    //인터셉션 옵저버
    //자바스크립트 내장옵션 -> 리액트 인터셉션 옵저버도있음
    //컴포넌트에 길이를 측정해서 대비해서 데이터를 보내줌
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch(); //이벤트함수실행
    let timeId = null;
    if (scrollY > limitScroll) {
      commentIsLoding.current = true;
      timeId = setTimeout(() => {
        commentIndex.current += 3;
        commentIsLoding.current = false;
        setLimitScroll(limitScroll + 300);
      }, 500);
    } else {
      commentIsLoding.current = false;
    }
    return () => {
      window.removeEventListener("scroll", handleFollow); //이벤트함수 삭제
      clearTimeout(timeId);
    };
  });
  return [limitScroll, commentIndex, commentIsLoding];
};

export default useSpinner;
