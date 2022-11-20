import axios from "axios";
import React from "react"
import { useEffect, useState } from 'react';
import { Nav } from "react-bootstrap";
import { useParams } from "react-router";

export default function Profile() {
  const { id } = useParams()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [memberSince, setMemberSince] = useState("")
  const [formationLevel, setFormationLevel] = useState("")
  const [domain, setDomain] = useState("")
  const [experience, setExperience] = useState("")
  const [teacherSince, setTeacherSince] = useState("")

  useEffect(() => {
    getUser(id)
    isSelf()
  }, [id])

  const getUser = (id) => {
    axios.get("http://localhost:8080/users/" + id)
      .then(({ data }) => {
        setName(data.data.name)
        setEmail(data.data.email)
        setBirthDate(data.data.birth_date)
        setMemberSince(data.data.created_at)

        if(isStudent()) getStudent()
        else getTeacher()
      })
  }

  const getStudent = (id) => {
    axios.get("http://localhost:8080/students/user/" + id)
      .then(({ data }) => {
        setFormationLevel(data.data.formation_level)
      })
  }

  const getTeacher = (id) => {
    axios.get("http://localhost:8080/teachers/user/" + id)
      .then(({ data }) => {
        setFormationLevel(data.data.formation_level)
        setDomain(data.data.domain)
        setExperience(data.data.experiencie)
        setTeacherSince(data.data.teacher_since)
      })
  }

  const isStudent = () => {
    return localStorage.getItem("profileType") === "1" ? true : false
  }

  const isSelf = () => {
    return id === localStorage.getItem("userId") ? true : false
  }

  return (
    <>
      <h1>Perfil</h1>
      <p><strong>Nome:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Idade:</strong> {birthDate}</p>
      {
        isStudent() === true &&
        <p><strong>Formação:</strong> {formationLevel}</p>
      }
      {
        !isStudent() &&
        <div>
          <p><strong>Formação:</strong> {formationLevel}</p>
          <p><strong>Domínio:</strong> {domain}</p>
          <p><strong>Professor desde:</strong> {teacherSince}</p> 
          <p><strong>Experiência:</strong> {experience}</p>
        </div>
      }

      <p><strong>Membro desde:</strong> {memberSince}</p>

      {
        isSelf() &&
        <div className="w-25 mt-4">
          <Nav.Link href="/" 
            className="btn btn-primary text-white"
            onClick={() => {
              localStorage.setItem("userId", null)
              localStorage.setItem("profileType", null)
            }}>
          Sair</Nav.Link>
        </div>
      }
    </>
  )
}