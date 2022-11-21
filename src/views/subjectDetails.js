import axios from "axios"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import ListClasses from "../components/listClasses"

export default function SubjectDetails() {
  const { id } = useParams()

  const [classes, setClasses] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/subjects/" + id + "/classrooms")
    .then(({ data }) => {
      setClasses(data.data)
    })
  }, [id])

  return (
    <>
      <h1>Oi</h1>
      {
        classes.length > 0 &&
        <ListClasses href="class" title="Classes" classes={classes} />
      }
      {
        classes.length == 0 &&
        <p>Nenhum classe cadastrada nesse tópico ainda</p>
      }
    </>
  )
}