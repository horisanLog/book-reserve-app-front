import { useState, useEffect } from "react";

export const useCoordinate = () => {
  const [coordinate, serCoordinate] = useState({ X: 30, Y: 30 });

  // ドラッグし始めた(MouseDownした)時のマウス座標 MouseDown時に保存し、MouseUp時にnullを入れてリセット
  const [mouseMoveCoordinate, setMouseMoveCoordinate] = useState<{
    X: number;
    Y: number;
  } | null>(null);

  useEffect(() => {
    // ドラッグし始めたならMouseMoveをイベントリスナーに登録し、onMouseMoveでobjectを動かす用の座標を計算する
    document.addEventListener("mousemove", onMouseMove);

    // MouseUpしたらドラッグ開始座標をリセット かつ MouseMoveのイベントリスナーも解除
    document.addEventListener("mouseup", () => {
      setMouseMoveCoordinate(null);
      document.removeEventListener("mousemove", onMouseMove);
    });
  }, [mouseMoveCoordinate]);

  const onMouseMove = (e: MouseEvent) => {
    // ドラッグ開始地点から現在のマウスまでの座標を計算し、最後にドラッグ終了した時のobjectが動いた座標に加算する
    if (mouseMoveCoordinate) {
      const afterCoordinate = {
        X: e.clientX - mouseMoveCoordinate.X + coordinate.X,
        Y: e.clientY - mouseMoveCoordinate.Y + coordinate.Y,
      };
      serCoordinate(afterCoordinate);
    }
  };

  return {
    data: {
      // MouseDownでドラッグ開始時の座標を保存
      onMouseDown: (e: React.MouseEvent) =>
        setMouseMoveCoordinate({ X: e.clientX, Y: e.clientY }),

      // MouseUp時にマウス位置をリセット
      onMouseUp: () => setMouseMoveCoordinate(null),

      // 座標のstyle
      style: {
        zIndex: 1000,
        transform: `translate3d(${coordinate.X}px, ${coordinate.Y}px, 0)`,
      },
    },
    // 使っていない
    coordinate: coordinate
  };
};
