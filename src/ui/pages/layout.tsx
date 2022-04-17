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
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

Leaflet.Icon.Default.imagePath = seat01;

// 方眼紙の背景のCSS
const styles = {
  backgroundImage:
    "linear-gradient(0deg, transparent calc(100% - 1px), #f0f0f0 calc(100% - 1px)) , linear-gradient(90deg, transparent calc(100% - 1px), #f0f0f0 calc(100% - 1px))",
  backgroundSize: "30px 30px",
  backgroundRepeat: "repeat",
  backgroundPosition: "left top",
  width: "1000px",
  height: "500px",
};

export const LayoutPage: React.FC = memo(() => {
  const { loading, todo, changeTodo } = useTodo();
  const [wSquare, setWSquare] = useState<number>(0);
  const [hSquare, setHSquare] = useState<number>(0);
  // const [coordinate, serCoordinate] = useState({ X: 0, Y: 0 });
  const [isDisable, setDisable] = useState<boolean>(false);

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

  if (loading) {
    return <div>{"ローディング中"}</div>;
  }

  return (
    <>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>

        <img src={seat01} alt="ライオンの画像" width="1000" height="500"></img>
      </MapContainer>
      {isDisable && (
        <div {...mouseEvent.data}>
          <div
            style={{
              height: 30 * hSquare,
              width: 30 * wSquare,
              background: "#a3c6f9",
              position: "absolute",
              zIndex: 1300,
              boxSizing: "border-box",
            }}
          >
            <Radio
              sx={{ width: "30px", height: "30px", zIndex: 1300 }}
              size="small"
            />
            <Radio
              sx={{ width: "30px", height: "30px", zIndex: 1300 }}
              size="small"
            />
            <Radio
              sx={{ width: "30px", height: "30px", zIndex: 1300 }}
              size="small"
            />
            <Radio
              sx={{ width: "30px", height: "30px", zIndex: 1300 }}
              size="small"
            />
          </div>
        </div>
      )}

      <Grid item container sm={12} xs={12}>
        <Grid item sm={1} xs={12}>
          <InputLabel>横</InputLabel>
        </Grid>
        <Grid item sm={3} xs={12}>
          <Select
            name="w_square"
            value={wSquare}
            variant="outlined"
            onChange={handleChange}
            defaultValue={wSquare}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid item container sm={12} xs={12}>
        <Grid item sm={1} xs={12}>
          <InputLabel>縦</InputLabel>
        </Grid>
        <Grid item sm={3} xs={12}>
          <Select
            name="h_square"
            value={hSquare}
            variant="outlined"
            onChange={handleChange}
            defaultValue={hSquare}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={tableCreate}>
        テーブル作成
      </Button>
      <br />
      <p style={{ paddingTop: "30px" }}>--↓react hook formの練習--</p>
      <TodoForm todo={todo} changeTodo={changeTodo} />
    </>
  );
});
