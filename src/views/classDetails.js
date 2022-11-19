import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function ClassDetails() {
  const { id } = useParams()

  // const [subject, setSubject] = useState("")
  const [price, setPrice] = useState("")
  const [start_date, setStart_date] = useState("")
  const [class_duration, setClass_duration] = useState("")
  const [duration_expectation, setDuration_expectation] = useState("")
  const [online, setOnline] = useState(false)
  const [available, setAvailable] = useState(false)
  const [origin, setOrigin] = useState("")
  const [classroom_id, setClassroom_id] = useState("")


  useEffect(() => {
    getClassDetails()
  })

  const getClassDetails = () => {
    axios.get("http://localhost:8080/class_details/classroom/" + id)
    .then(({ data }) => {
      // setSubject(data.subject)
      setPrice(data.data.price)
      setStart_date(data.data.start_date)
      setClass_duration(data.data.class_duration)
      setDuration_expectation(data.data.duration_expectation)
      setOnline(data.data.online)
      setAvailable(data.data.available)
      setOrigin(data.data.origin)
      setClassroom_id(data.data.classroom_id)
    })
  }

  return(
    <div>
      <h1>Class Details</h1>
      {/* <h1>{subject}</h1> */}
      <p>{price}</p>
      <p>{start_date}</p>
      <p>{class_duration}</p>
      <p>{duration_expectation}</p>
      <p>{online}</p>
      <p>{available}</p>
      <p>{origin}</p>
      <p>{classroom_id}</p>
    </div>
  )
}