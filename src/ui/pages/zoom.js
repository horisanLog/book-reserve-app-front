import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Moveable from "react-moveable";
import shortid from "shortid";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const MoveableElemet = (props) => {
  const throttles = { drag: 10, resize: 10, rotate: 90 };
  const bounds = { left: 0, top: 0, right: 490, bottom: 490 };
  const { properties, allowMoveable, onDuplicate, onRemove } = props;
  const [privateProps, setPrivateProps] = useState(properties);
  const [tempProps, setTempProps] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMoveable, setIsMoveable] = useState(false);
  const [target, setTarget] = useState();

  console.log(privateProps);

  useEffect(() => {
    setTarget(document.getElementById(properties.id));
  }, [properties.id, properties.classSelector]);

  const generateStyleObject = (attributes) => ({
    position: "absolute",
    width: `${attributes.width}px`,
    height: `${attributes.height}px`,
    top: `${attributes.top}px`,
    left: `${attributes.left}px`,
    background: attributes.backgroundColor,
    border: attributes.border,
    borderColor: attributes.borderColor,
    transform: `rotate(${attributes.rotate}deg)`,
    color: attributes.fontColor,
    fontWeight: "bold",
    boxSizing: "border-box",
    cursor: "pointer",
  });

  const onMouseEnter = () => {
    setIsHovered(true);
    setIsMoveable(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    setIsMoveable(isClicked);
  };

  const onMouseDown = () => {
    setIsClicked(true);
    setIsMoveable(true);
  };

  const onMouseUp = () => {
    setIsClicked(false);
    setIsMoveable(isHovered);
  };

  const onDoubleClick = () => {
    setIsHovered(false);
    setIsClicked(false);
    setIsMoveable(false);
  };

  const duplicateButton = (
    <button
      onClick={() => onDuplicate(properties.id)}
      onTouchStart={() => onDuplicate(properties.id)}
    >
      追加
    </button>
  );

  const removeButton = (
    <button
      onClick={() => onRemove(properties.id)}
      onTouchStart={() => onRemove(properties.id)}
    >
      削除
    </button>
  );

  return (
    <React.Fragment>
      <div
        id={properties.id}
        className={properties.classSelector}
        style={generateStyleObject(properties)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onDoubleClick={onDoubleClick}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `rotate(${-1 * properties.rotate}deg)`,
          }}
        >
          {properties.name}
          {allowMoveable ? duplicateButton : null}
          {allowMoveable ? removeButton : null}
        </div>
      </div>
      {allowMoveable ? (
        <Moveable
          target={target}
          draggable={true}
          resizable={true}
          rotatable={true}
          // pinchable={true}
          snappable={true}
          keepRatio={true}
          throttleDrag={throttles.drag}
          throttleResize={throttles.resize}
          throttleRotate={throttles.rotate}
          bounds={bounds}
          // renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          edge={false}
          zoom={1}
          origin={false}
          padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
          onDragStart={({ target, clientX, clientY }) => {
            // console.log("onDragStart", target);
          }}
          onDrag={({
            target,
            beforeDelta,
            beforeDist,
            left,
            top,
            right,
            bottom,
            delta,
            dist,
            transform,
            clientX,
            clientY,
          }) => {
            // console.log("onDrag left, top", left, top);
            // target.style.left = `${left}px`;
            // target.style.top = `${top}px`;
            // console.log("onDrag translate", dist);
            target.style.transform = transform;
            let deltaX = dist[0];
            let deltaY = dist[1];
            // if (privateProps.rotate === 90) {
            //   deltaX = dist[1] * -1;
            //   deltaY = dist[0];
            // } else if (privateProps.rotate === 180) {
            //   deltaX = dist[0] * -1;
            //   deltaY = dist[1] * -1;
            // } else if (privateProps.rotate === 270) {
            //   deltaX = dist[1];
            //   deltaY = dist[0] * -1;
            // }
            setTempProps({ left: deltaX, top: deltaY });
          }}
          // onDragEnd={({ target, isDrag, clientX, clientY }) => {
          //   // console.log("onDragEnd", target, isDrag, clientX, clientY);
          //   setPrivateProps({
          //     ...privateProps,
          //     left:
          //       tempProps.left !== undefined
          //         ? privateProps.left + tempProps.left
          //         : privateProps.left,
          //     top:
          //       tempProps.top !== undefined
          //         ? privateProps.top + tempProps.top
          //         : privateProps.top,
          //   });
          //   setTempProps({});
          // }}
          onResizeStart={({ target, clientX, clientY }) => {
            // console.log("onResizeStart", target);
          }}
          onResize={({
            target,
            width,
            height,
            dist,
            delta,
            direction,
            clientX,
            clientY,
          }) => {
            // console.log("onResize", target);
            // console.log("onResize", delta);
            // console.log("onResize", width, height);
            delta[0] && (target.style.width = `${width}px`);
            delta[1] && (target.style.height = `${height}px`);
            setPrivateProps({
              ...privateProps,
              width: width,
              height: height,
            });
            setTempProps({});
          }}
          // onResizeEnd={({ target, isDrag, clientX, clientY }) => {
          //   // console.log("onResizeEnd", target, isDrag);
          // }}
          // onRotateStart={({ target, clientX, clientY }) => {
          //   // console.log("onRotateStart", target);
          // }}

          onRotate={({ target, delta, dist, transform, clientX, clientY }) => {
            // console.log("onRotate", dist);
            const angle = (privateProps.rotate + dist) % 360;
            setTempProps({ rotate: angle < 0 ? 360 + angle : angle });
            target.style.transform = transform;
          }}

          // onRotateEnd={({ target, isDrag, clientX, clientY }) => {
          //   // console.log("onRotateEnd", target, isDrag);
          //   setPrivateProps({
          //     ...privateProps,
          //     rotate:
          //       tempProps.rotate !== undefined
          //         ? tempProps.rotate
          //         : privateProps.rotate,
          //   });
          //   setTempProps({});
          // }}
          // onPinchStart={({ target, clientX, clientY, datas }) => {
          //   // pinchStart event occur before dragStart, rotateStart, scaleStart, resizeStart
          //   // console.log("onPinchStart");
          // }}
          // onPinch={({ target, clientX, clientY, datas }) => {
          //   // pinch event occur before drag, rotate, scale, resize
          //   // console.log("onPinch");
          // }}
          // onPinchEnd={({ isDrag, target, clientX, clientY, datas }) => {
          //   // pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
          //   // console.log("onPinchEnd");
          // }}
        />
      ) : null}
    </React.Fragment>
  );
};


export const Zoom = () => {
  const [targets, setTargets] = useState([
    {
      id: "target",
      name: "テーブル1",
      width: 100,
      height: 100,
      top: 100,
      left: 100,
      rotate: 90,
      backgroundColor: "red",
      fontColor: "white",
    },
    {
      id: "target2",
      name: "テーブル2",
      width: 100,
      height: 100,
      top: 100,
      left: 300,
      rotate: 180,
      border: "4px solid",
      borderColor: "blue",
      position: "absolute",
      fontColor: "black",
    },
  ]);
  const [isMoveable, setIsMoveable] = useState(false);

  const toggleMoveable = () => {
    setIsMoveable(!isMoveable);
  };

  const onDuplicate = (id) => {
    const newTarget = { ...targets.find((item) => item.id === id) };
    newTarget.id = shortid.generate();
    newTarget.name = `${newTarget.name}`;
    setTargets([...targets, newTarget]);
  };

  const onRemove = (id) => {
    const index = targets.findIndex((item) => item.id === id);
    setTargets([...targets.slice(0, index), ...targets.slice(index + 1)]);
  };



  /////////////////////////////////// ここから以下はMoveableを使用していない関数
  const [coordinate, serCoordinate] = useState({ X: 30, Y: 30 });

  // ドラッグし始めた(MouseDownした)時のマウス座標 MouseDown時に保存し、MouseUp時にnullを入れてリセット
  const [mouseMoveCoordinate, setMouseMoveCoordinate] = useState({
    X: 0,
    Y: 0,
  });

  useEffect(() => {
    // ドラッグし始めたならMouseMoveをイベントリスナーに登録し、onMouseMoveでobjectを動かす用の座標を計算する
    document.addEventListener("mousemove", onMouseMove);

    // MouseUpしたらドラッグ開始座標をリセット かつ MouseMoveのイベントリスナーも解除
    document.addEventListener("mouseup", () => {
      setMouseMoveCoordinate(null);
      document.removeEventListener("mousemove", onMouseMove);
    });
  }, [mouseMoveCoordinate]);

  const onMouseMove = (e) => {
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
    <TransformWrapper
      defaultScale={1}
      options={{ disabled: isMoveable, minScale: 0.2 }}
      wheel={{ disabled: true }}
      panning={{ disabled: true }}
      zoomIn={{ step: 10 }}
      zoomOut={{ step: 10 }}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div
            style={{
              bottom: "10px",
              right: "10px",
            }}
          >
            <button onClick={() => zoomIn()}>+</button>
            <button style={{ marginLeft: "10px" }} onClick={() => zoomOut()}>
              -
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => resetTransform()}
            >
              x
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => toggleMoveable()}
            >
              編集
            </button>
          </div>
          <TransformComponent>
            <div
              className="container"
              style={{
                width: "100vw",
                height: "500px",
                background:
                  "repeating-linear-gradient(0deg, rgba(120, 120, 120, 0.2), rgba(120, 120, 120, 0.22) 2px, rgba(0, 0, 0, 0) 2px, rgba(0, 0, 0, 0) 240px), repeating-linear-gradient(-90deg, rgba(120, 120, 120, 0.22), rgba(120, 120, 120, 0.22) 2px, rgba(0, 0, 0, 0) 2px, rgba(0, 0, 0, 0) 240px), repeating-linear-gradient(0deg, rgba(120, 120, 120, 0.22), rgba(120, 120, 120, 0.22) 2px, rgba(0, 0, 0, 0) 2px, rgba(0, 0, 0, 0) 60px), repeating-linear-gradient(-90deg, rgba(120, 120, 120, 0.22), rgba(120, 120, 120, 0.22) 2px, rgba(0, 0, 0, 0) 2px, rgba(0, 0, 0, 0) 60px)",
                top: 0,
                left: 0,
                // userDrag: "none",
                // webkitUserDrag: "none",
                // mozUserSelect: "none",
              }}
            >
              {targets.map((target) => (
                <MoveableElemet
                  key={target.id}
                  properties={target}
                  allowMoveable={isMoveable}
                  onDuplicate={onDuplicate}
                  onRemove={onRemove}
                />
              ))}
            </div>
            <div
              width="600"
              height="400"
              onMouseDown={(e) =>
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
            ></div>
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
};
