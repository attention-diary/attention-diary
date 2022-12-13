import { useEffect, useRef, useState } from "react";

const useSpinner = () => {
  const [limitScroll, setLimitScroll] = useState(630); //댓글3번째의 스크롤값?
  const [scrollY, setScrollY] = useState(0); //스크롤값 저장하기 위한 상태
  const commentIndex = useRef(3); //댓글3개씩 보여주기위한 ref값
  const commentIsLoding = useRef(false); //댓글3개를 불러올때 사용할 isloding값

  return [
    limitScroll,
    setLimitScroll,
    scrollY,
    setScrollY,
    commentIndex,
    commentIsLoding,
  ];
};

export default useSpinner;
