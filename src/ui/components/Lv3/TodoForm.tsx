import { memo, useState, useCallback } from "react";
import { Todo } from "../../../domain/todo";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, FormControl, FormControlLabel } from "@mui/material";
import * as Yup from "yup";

interface Props {
  todo: Todo;
  changeTodo: (todo: Todo, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TodoForm: React.FC<Props> = memo(({ todo, changeTodo }: Props) => {
  const basicSchema = Yup.object().shape({
    title: Yup.string()
      .required("必須項目です")
      .max(10, "10文字以内で入力してください")
      .matches(
        /^[a-zA-Z0-9!-/:-@¥[-`{-~ ]*$/,
        "半角英数字記号以外は使用できません"
      ),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: todo.text,
    },
    resolver: yupResolver(basicSchema),
  });

  const [test, setTest] = useState<string>("");

  const onSubmit: SubmitHandler<{ title: string }> = useCallback((data) => {console.log(data)},[]);

  console.log("test")

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextField
              {...field}
              label="テキストフィールド"
              error={errors.title ? true : false}
              helperText={errors.title?.message}
              fullWidth
              margin="normal"
              placeholder="プレースホルダー"
            />
          )}
        />
        <input onChange={(e) => setTest(e.target.value)}></input>
        <br />
        {test}
        <br />
        <input type="submit" />
      </form>
    </>
  );
});
