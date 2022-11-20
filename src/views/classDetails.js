import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Stack } from "react-bootstrap";

export default function ClassDetails() {
  const { id } = useParams()

  const [teacherId, setTeacherId] = useState("")
  const [teacherName, setTeacherName] = useState("")
  const [subject, setSubject] = useState("")
  const [className, setClassName] = useState("")
  const [price, setPrice] = useState("")
  const [start_date, setStart_date] = useState("")
  const [class_duration, setClass_duration] = useState("")
  const [end_expectation, setEnd_expectation] = useState("")
  const [online, setOnline] = useState(false)
  const [available, setAvailable] = useState(false)
  const [origin, setOrigin] = useState("")

  useEffect(() => {
    getClassDetails()
    getSubject()
  })

  const getClassDetails = () => {
    axios.get("http://localhost:8080/class_details/classroom/" + id)
    .then(({ data }) => {
      setPrice(data.data.price)
      const formatedDate = data.data.start_date.split("T")[0].split('-').reverse().join('/')
      setStart_date(formatedDate)
      setClass_duration(data.data.class_duration)
      setEnd_expectation(data.data.end_expectation)
      setOnline(data.data.online ? "Sim": "Não")
      setAvailable(data.data.available ? "Sim": "Não")
      setOrigin(data.data.origin === "offered" ? "Oferecida" : "Sugerida")

      axios.get("http://localhost:8080/classrooms/" + id)
      .then(({ data }) => {
        setTeacherId(data.data.teacher_id)
        getTeacher(data.data.teacher_id)
      })
    })
  }

  const getSubject = () => {
    axios.get("http://localhost:8080/classrooms/" + id)
    .then(({ data }) => {
      setClassName(data.data.name)
      axios.get("http://localhost:8080/subjects/" + data.data.subject_id)
      .then(({ data }) => {
        setSubject(data.data.name)
      })
    })
  }

  const getTeacher = (id) => {
    axios.get("http://localhost:8080/teachers/" + id)
    .then(({ data }) => {

      axios.get("http://localhost:8080/users/" + data.data.user_id)
      .then(({ data }) => {
        setTeacherName(data.data.name)
      })
    })
  }

  return(
    <div>
      <h1 className="my-4">Detalhes: {className}</h1>
      <p><strong>Tópico:</strong> {subject}</p>
      <p><strong>Preço:</strong> R$ {price}</p>
      <p><strong>Início:</strong> {start_date}</p>
      <p><strong>Aulas necessárias:</strong> {end_expectation} aulas</p>
      <p><strong>Duração das aulas:</strong> {class_duration} horas</p>
      <p><strong>Online?</strong> {online}</p>
      <p><strong>Disponível?</strong> {available}</p>
      <p><strong>Origem:</strong> {origin}</p>
      <Stack direction="horizontal" gap={1}>
        <span><strong>Professor:</strong> </span>
        {
          teacherName 
          ? <a href={`/profile/${teacherId}`}>{teacherName}</a>
          : <span>Não definido</span>
        }
      </Stack>
        
    </div>
  )
}