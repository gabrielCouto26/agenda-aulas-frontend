import { Stack } from "react-bootstrap";
import ClassCard from "./classCard"

export default function ListClasses({ title, classes }) {
  return (
    <>
      <h4>{ title }</h4>
      <Stack direction="horizontal" className="my-4">
        { classes.map((c, index) => {
          return (
            <ClassCard id={c.id} name={c.name} key={index}/>
          )
        })}
      </Stack>
    </>
  )
}