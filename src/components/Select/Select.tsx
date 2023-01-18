import { FC, ChangeEvent } from "react"
import { Units } from "../../types/Units"
import css from "./select.module.css"

interface ISelect {
       value: Units;
       units: { value: Units, label: string }[];
       onChange: (e: ChangeEvent<{ value: Units } & HTMLSelectElement>) => void;
}

export const Select: FC<ISelect> = ({ value, units, onChange }) => {
       return (
              <select className={css.select} value={value} onChange={onChange}>
                     {units.map((unit) => {
                            return <option key={unit.value} value={unit.value}>{unit.label}</option>
                     })}
              </select>
       )

}
