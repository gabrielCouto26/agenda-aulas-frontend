import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function ClassDetails() {
  const { id } = useParams()

  const [userName, setUserName] = useState("")
  const [profile, setProfile] = useState("")
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
    getUser(localStorage.getItem("userId"))
    setUserProfile(localStorage.getItem("profileType"))
    getClassDetails()
    getSubject()
  })

  const getUser = (id) => {
    axios.get("http://localhost:8080/users/" + id)
    .then(({ data }) => {
      setUserName(data.data.name)
    })
  }

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

  const setUserProfile = (type) => {
    const profile = type === "1" ? "Aluno" : "Professor"
    setProfile(profile)
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
      <p><strong>Origem:</strong> {origin} pelo {profile} {userName}</p>
    </div>
  )
}