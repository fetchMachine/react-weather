import { ChangeEvent, FC } from "react";
import css from "./input.module.css"

interface InputProps {
       value: string,
       disabled?: boolean,
       onChange: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({ value, disabled, onChange }) => {
       return (
              <input
                     className={css.search}
                     value={value}
                     disabled={disabled}
                     onChange={(e) => onChange(e.target.value, e)}
              />
       )
}
