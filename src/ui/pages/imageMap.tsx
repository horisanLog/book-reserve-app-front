import { memo, useState, useEffect } from "react";
import { useTodo } from "../../hooks/todo";
import { TodoForm } from "../components/TodoForm";
import { Box } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import seat01 from "../../seat01.png";

import { useCoordinate } from "../../hooks/useCoordinate";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Alert from "@mui/material/Alert";

export const ImageMapPage: React.FC = memo(() => {
  const { loading, todo, changeTodo } = useTodo();
  const [wSquare, setWSquare] = useState<number>(0);
  const [hSquare, setHSquare] = useState<number>(0);
  const [isDisable, setDisable] = useState<boolean>(false);

  // alert
  const [isInfoAlert, setIsInfoAlert] = useState<boolean>(false);
  const [isSuccessAlert, setIsSuccessAlert] = useState<boolean>(false);

  const mouseEvent = useCoordinate();

  const handleChange = (e: SelectChangeEvent<number>) => {
    switch (e.target.name) {
      case "w_square":
        return setWSquare(Number(e.target.value));
      case "h_square":
        return setHSquare(Number(e.target.value));
    }
  };

  // useEffect(() => {
  //   serCoordinate(mouseEvent.coordinate)
  // }, [mouseEvent]);

  const tableCreate = async (e: React.FormEvent) => {
    setDisable(true);
  };

  // if (loading) {
  //   return <div>{"ローディング中"}</div>;
  // }

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

  return (
    <>
      <img alt="ライオンの画像" width="1000" height="500" useMap="#image-map" />
      <img src={seat01} useMap="#image-map" />
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <div className="tools">
              <button onClick={() => zoomIn()}>+</button>
              <button onClick={() => zoomOut()}>-</button>
              <button onClick={() => resetTransform()}>x</button>
            </div>
            <TransformComponent>
              <div
                style={{
                  transform:
                    "translate3d(-273.65px, -195.65px, 0px) scale(1.65)",
                }}
              >
                <map name="image-map">
                  <area
                    target="_blank"
                    alt="1"
                    title="1"
                    href="https://haniwaman.com/map-area/"
                    coords="112,191,175,274"
                    shape="rect"
                    style={{
                      background: "red",
                    }}
                    onClick={() => console.log("test")}
                    onMouseOver={() => setIsInfoAlert(true)}
                    onMouseOut={() => setIsInfoAlert(false)}
                  />
                  <div
                    id="image-2"
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: "red",
                    }}
                  >
                    <area
                      target="_blank"
                      alt="2"
                      title="2"
                      coords="664,383,720,462"
                      shape="rect"
                      id="image-2"
                      onClick={(e) => {
                        let test = document.getElementById("image-2");
                        if (test) {
                          test.style.backgroundColor = "#red";
                        }
                        console.log("test");
                      }}
                      onMouseOver={() => setIsSuccessAlert(true)}
                      onMouseOut={() => setIsSuccessAlert(false)}
                    ></area>
                  </div>
                </map>
              </div>
              <canvas
                id="canvas"
                width="600"
                height="400"
                onMouseDown={(e: React.MouseEvent) =>
                  setMouseMoveCoordinate({ X: e.clientX, Y: e.clientY })
                }
                onMouseUp={() => setMouseMoveCoordinate(null)}
                style={{
                  transform: `translate3d(${coordinate.X}px, ${coordinate.Y}px, 0)`,
                  width: "100px",
                  height: "100px",
                  border: "4px solid",
                  borderColor: "rgb(119 40 136)",
                  position: "absolute",
                  zIndex: 1,
                }}
              ></canvas>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
      {isSuccessAlert && <Alert severity="success">空いています</Alert>}
      {isInfoAlert && <Alert severity="info">空いていません</Alert>}
    </>
  );
});
