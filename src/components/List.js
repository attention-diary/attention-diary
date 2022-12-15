import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useRef, useState } from 'react';

// posts 배열을 받는다.
export default function List({ posts }) {
  const navigate = useNavigate();

  const listRef = useRef();

  const [currIndex, setCurrIndex] = useState(0);
  const [transX, setTransX] = useState(0);

  // 처음 x좌표를 설정하는 로직
  useLayoutEffect(() => {
    const getCoordinate = () => {
      const listLeft = listRef.current.getBoundingClientRect().left;
      setTransX(listLeft);
    };
    getCoordinate();
  }, []);

  const handleClickNavBtn = (direction) => {
    if (direction === 'right') {
      const listNode_currentX = listRef.current.childNodes[currIndex + 1].getBoundingClientRect().left;
      listRef.current.style.transform =
        `translateX(-${listNode_currentX - transX}px)`;
      setCurrIndex(currIndex + 2);
    } else {
      const listNode_currentX = listRef.current.childNodes[currIndex - 1].getBoundingClientRect().left;
      listRef.current.style.transform =
        `translateX(-${listNode_currentX - transX}px)`;
      setCurrIndex(currIndex - 2);
    }
  };

  return (
    <>
      <div className='carousel-btn'>
        <button
          type='button'
          onClick={() => handleClickNavBtn('left')}
          className='left-btn'
        >
          {`<`}
        </button>
        <button
          type='button'
          onClick={() => handleClickNavBtn('right')}
          className='right-btn'
        >
          {`>`}
        </button>
      </div>
      <div className='carousel-wrapper'>
        <ul className='carousel' ref={listRef}>
          {posts.map(post => (
            <li key={post.id}>
              <div>
                <p>{post.title}</p>
                <button
                  type='button'
                  className='detail-btn'
                  onClick={() => { navigate(`/detailPage/${post.id}`, { state: post }) }}
                >
                  {` 읽어보기 >`}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
