export interface ISwipeListeners {
  onSwipe?: (e: CustomEvent<ISwipeEventDetail>) => void;
  onSwipeUp?: (e: CustomEvent<ISwipeEventDetail>) => void;
  onSwipeDown?: (e: CustomEvent<ISwipeEventDetail>) => void;
  onSwipeLeft?: (e: CustomEvent<ISwipeEventDetail>) => void;
  onSwipeRight?: (e: CustomEvent<ISwipeEventDetail>) => void;
  onSwipeMoviment?: (e: CustomEvent<IMovimentEventDetail>) => void;
}

export interface ISwipeListenerOptions {
  threshold?: number;
  timeout?: number;
  listenChild?: boolean;
}

export interface ISwipeRef {
  xStart: null | number;
  yStart: null | number;
  xLast: null | number;
  yLast: null | number;
  xDiff: number;
  yDiff: number;
  timeDown: null | number;
  startEl: EventTarget | null;
}

export interface IObjectLisHandlers {
  [key: string]: ((e: any) => void) | undefined;
}

export interface ISwipeEventDetail {
  dir: string;
  xStart: number | null;
  xEnd: number;
  yStart: number | null;
  yEnd: number;
}

export interface IMovimentEventDetail {
  touchMoveEvent: React.TouchEvent<Element>;
  xStart: number;
  xCurrent: number;
  xDiff: number;
  xMov: number;
  yStart: number;
  yCurrent: number;
  yDiff: number;
  yMov: number;
}
