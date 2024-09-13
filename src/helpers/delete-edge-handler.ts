import { TouchEvent } from 'react';

export const handleTouchStart = (
  event: TouchEvent,
  setShowDeleteIcon: (value: boolean) => void,
  isShowDeleteIcon: boolean,
) => {
  event.preventDefault();
  let timer = Date.now();
  let isMoving = false;

  const onTouchMove = () => {
    isMoving = true;
  };

  const onTouchEnd = () => {
    if (Date.now() - timer > 1000 && !isMoving) {
      setShowDeleteIcon(!isShowDeleteIcon);
    }
    event.target.removeEventListener('touchmove', onTouchMove);
    event.target.removeEventListener('touchend', onTouchEnd);
  };


  event.target.addEventListener('touchmove', onTouchMove);
  event.target.addEventListener('touchend', onTouchEnd);
};
