import { FC } from "react";

import css from "./info.module.css"

interface IProps {
       icon: any,
       label: string,
       value: string;
       unit: string;
}

export const Info: FC<IProps> = (props) => {

       return (
              <div className={css.info}>
                     <img className = {css.icon} src={props.icon} alt="icon"/>
                     <span className={css.label}>{props.label}</span>
                     <span className={css.value}>{props.value}{props.unit}</span>
              </div>
       )
}

