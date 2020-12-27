import React,  { useCallback, useEffect, useRef, useState, useReducer } from 'react';
import Moveable, { OnResize } from 'moveable';

interface UseMoveableOptions {
  resizable?: boolean;
  draggable?: boolean;
  zoom?: number;
  enabled?: boolean;
  container?: React.RefObject<HTMLElement>;
  onResize?: (data: OnResize) => void;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
}

interface MoveableState {
  resize?: OnResize;
  updateRect: () => void;
  moveable?: Moveable | null;
}

function useMoveable({
                       zoom = 0.6,
                       enabled = false,
                       container = React.useRef(document.body),
                       ...options
                     }: UseMoveableOptions): [MoveableState, (target: any) => any] {
  const targetRef = useRef<HTMLDivElement>();
  const moveable = useRef<Moveable>();
  const [resize, setResize] = useState<OnResize>();

  const handeWindowResize = useCallback(() => {
    moveable.current && moveable.current!.updateRect();
  }, [moveable]);

  const [, forceRender] = useReducer((s) => s + 1, 0);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    if (!targetRef.current) {
      return;
    }

    const _moveable = (moveable.current = new Moveable(container.current!, {
      ...options,
      target: targetRef.current,
      origin: false,
      className: 'className',
      // throttleResize: 0,
      // throttleDrag: 0,
      // keepRatio: true,
    })
      .on('resize', (data: OnResize) => {
        setResize(data);
        options.onResize && options.onResize(data);
      }))

    _moveable.setState({ zoom });
    // _moveable.zoom = zoom;
    if (options.onResizeStart) {
      _moveable.on('resizeStart', options.onResizeStart);
    }
    if (options.onResizeEnd) {
      _moveable.on('resizeEnd', options.onResizeEnd);
    }

    window.addEventListener('resize', handeWindowResize);
    forceRender();
    return () => {
      _moveable!.destroy();
      window.removeEventListener('resize', handeWindowResize);
      moveable.current = undefined;
    };
  }, [targetRef.current, enabled]);

  const refCallback = useCallback((ref: any) => {
    if (!ref) {
      return;
    }
    targetRef.current = ref.hasOwnProperty('current') ? ref.current : ref;
    return ref;
  }, []);
  return [
    {
      resize,
      updateRect: handeWindowResize,
      moveable: moveable.current,
    },
    refCallback,
  ];
}

export default useMoveable;
