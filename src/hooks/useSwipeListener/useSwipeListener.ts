import React, { useEffect, useRef } from 'react';
import {
  IObjectLisHandlers,
  ISwipeListenerOptions,
  ISwipeListeners,
  ISwipeRef,
  IMovimentEventDetail,
  ISwipeEventDetail,
} from './interfaces';

export interface IEvent extends CustomEvent<IMovimentEventDetail> {}

export function useSwipeListener(
  elRef: React.MutableRefObject<HTMLElement | null>,
  {
    onSwipe,
    onSwipeUp,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight,
    onSwipeMoviment,
  }: ISwipeListeners = {},
  {
    threshold = 20,
    timeout = 500,
    listenChild = false,
  }: ISwipeListenerOptions = {}
): void {
  const swipeRef: React.MutableRefObject<ISwipeRef> = useRef({
    xStart: null,
    yStart: null,
    xLast: null,
    yLast: null,
    xDiff: 0,
    yDiff: 0,
    timeDown: null,
    startEl: null,
  });

  useEffect(() => {
    const element = elRef.current;

    const handleTouchStart = (e: React.TouchEvent) => {
      const target = e.target as HTMLElement;
      if (
        target != element &&
        !(listenChild && target.parentElement === element)
      )
        return;

      swipeRef.current.xStart = e.targetTouches[0].clientX;
      swipeRef.current.yStart = e.targetTouches[0].clientY;
      swipeRef.current.xDiff = 0;
      swipeRef.current.yDiff = 0;
      swipeRef.current.timeDown = Date.now();
      swipeRef.current.startEl = e.target;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      const { xStart, yStart, xLast, yLast, startEl } = swipeRef.current;

      if (!xStart || !yStart || !startEl) return;

      const xUp = e.touches[0].clientX;
      const yUp = e.touches[0].clientY;

      swipeRef.current.xDiff = xStart - xUp;
      swipeRef.current.yDiff = yStart - yUp;

      const changedTouches: React.TouchList = e.changedTouches || e.touches;

      const xCurrent = (changedTouches[0] || {}).clientX || -1;
      const yCurrent = (changedTouches[0] || {}).clientY || -1;

      const eventData: IMovimentEventDetail = {
        touchMoveEvent: e,
        xStart,
        xCurrent,
        xDiff: swipeRef.current.xDiff,
        xMov: (xLast || xStart) - xCurrent,
        yStart,
        yCurrent,
        yDiff: swipeRef.current.yDiff,
        yMov: (yLast || yStart) - yCurrent,
      };

      swipeRef.current.xLast = xCurrent;
      swipeRef.current.yLast = yCurrent;

      if (element) {
        element.dispatchEvent(
          new CustomEvent('swipe-mov', {
            bubbles: true,
            cancelable: true,
            detail: eventData,
          })
        );
      }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      const { xStart, yStart, xDiff, yDiff, timeDown } = swipeRef.current;

      const target = e.target as HTMLElement;
      if (
        target != element &&
        !(listenChild && target.parentElement === element)
      )
        return;

      const swipeThreshold = threshold; // default 20px
      const swipeTimeout = timeout; // default 500ms
      const timeDiff = Date.now() - (timeDown || 0);
      const changedTouches: React.TouchList = e.changedTouches || e.touches;
      let eventType = '';

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        // most significant
        if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
          if (xDiff > 0) {
            eventType = 'swiped-left';
          } else {
            eventType = 'swiped-right';
          }
        }
      } else if (Math.abs(yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
        if (yDiff > 0) {
          eventType = 'swiped-up';
        } else {
          eventType = 'swiped-down';
        }
      }

      if (eventType !== '') {
        const eventData: ISwipeEventDetail = {
          dir: eventType.replace(/swiped-/, ''),
          xStart: xStart,
          xEnd: (changedTouches[0] || {}).clientX || -1,
          yStart: yStart,
          yEnd: (changedTouches[0] || {}).clientY || -1,
        };

        // fire `swiped` event event on the element that started the swipe
        target.dispatchEvent(
          new CustomEvent('swiped', {
            bubbles: true,
            cancelable: true,
            detail: eventData,
          })
        );

        // fire `swiped-dir` event on the element that started the swipe
        target.dispatchEvent(
          new CustomEvent(eventType, {
            bubbles: true,
            cancelable: true,
            detail: eventData,
          })
        );
      }

      // reset values
      swipeRef.current.xStart = null;
      swipeRef.current.yStart = null;
      swipeRef.current.timeDown = null;
      swipeRef.current.xLast = null;
      swipeRef.current.yLast = null;
    };

    const eventCaller = (cb: ((e: any) => void) | undefined) => {
      if (cb) {
        return (e: CustomEvent) => {
          const target = e.target as HTMLElement;
          if (
            target === element ||
            (listenChild && target.parentElement === element)
          )
            cb(e);
        };
      }
      return;
    };

    const swipesEventHandles = {
      swiped: eventCaller(onSwipe),
      'swiped-up': eventCaller(onSwipeUp),
      'swiped-down': eventCaller(onSwipeDown),
      'swiped-left': eventCaller(onSwipeLeft),
      'swiped-right': eventCaller(onSwipeRight),
      'swipe-mov': eventCaller(onSwipeMoviment),
      touchstart: handleTouchStart,
      touchmove: handleTouchMove,
      touchend: handleTouchEnd,
    };
    if (element !== null) {
      forEachDefinedHandler(swipesEventHandles, element.addEventListener);
    }
    return () => {
      if (element !== null) {
        forEachDefinedHandler(swipesEventHandles, element.removeEventListener);
      }
    };
  }, []);

  const forEachDefinedHandler = (
    object: IObjectLisHandlers,
    interaction:
      | ((
          type: string,
          listener: EventListenerOrEventListenerObject,
          options?: boolean | AddEventListenerOptions
        ) => void)
      | undefined
  ) => {
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        if (element && interaction) interaction(key, element, false);
      }
    }
  };
}
