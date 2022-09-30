import React, { useRef } from 'react';
import { UpperDiv } from '../../app/styled';
import { useSwipeListener } from '../../hooks';
import { ISwipeListeners } from '../../hooks/useSwipeListener/interfaces';

interface ISwipeContainerProps extends ISwipeListeners {
  children: React.ReactNode;
}

export const SwipeContainer = ({ children }: ISwipeContainerProps) => {
  const divElRef = useRef(null);

  useSwipeListener(
    divElRef,
    {
      onSwipe: e => {
        const target = e.target as HTMLElement;
        target.innerHTML = e.detail.dir;
      },
    },
    { listenChild: true }
  );

  return (
    <div ref={divElRef}>
      <UpperDiv>Swipe me</UpperDiv>
    </div>
  );
};
