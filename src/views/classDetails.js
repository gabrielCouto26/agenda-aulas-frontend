import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";
import { Button, Stack } from "react-bootstrap";
import axios from "axios";

export default function ClassDetails() {
  const { id } = useParams()

  const [subject, setSubject] = useState("")
  const [className, setClassName] = useState("")
  const [price, setPrice] = useState("")
  const [startDate, setStartDate] = useState("")
  const [classDuration, setClassDuration] = useState("")
  const [endExpectation, setEndExpectation] = useState("")
  const [online, setOnline] = useState(false)
  const [available, setAvailable] = useState(false)
  const [origin, setOrigin] = useState("")
  const [studentCanAccept, setStudentCanAccept] = useState(false)
  const [teacherCanAccept, setTeacherCanAccept] = useState(false)
  const [isStudent, setIsStudent] = useState(false)
  const [teacherId, setTeacherId] = useState("")
  const [teacherName, setTeacherName] = useState("")
  const [studentIdAccept, setStudentIdAccept] = useState("")
  const [teacherIdAccept, setTeacherIdAccept] = useState("")
  const [classroomStudents, setClassroomStudents] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const handleStudentAccept = (e) => {
    e.preventDefault()
    axios.put("http://localhost:8080/classrooms/" + id, {
      "classroom": { student_id: studentIdAccept }
    })
    .then(({ data }) => {
      if(data.status === 200){
        setShouldRedirect(true)
      }
    })
  }

  const handleTeacherAccept = (e) => {
    e.preventDefault()
    console.log("teacherIdAccept", teacherIdAccept)
    axios.put("http://localhost:8080/classrooms/" + id, {
      "classroom": { teacher_id: teacherIdAccept }
    })
    .then(({ data }) => {
      if(data.status === 200){
        setShouldRedirect(true)
      }
    })
  }

  useEffect(() => {
    console.log("useEffect classDetails")
    getClassDetails(id)
    setProfile()
  }, [id])

  const setProfile = () => {
    if(localStorage.getItem("profileType") === "1"){
      setIsStudent(true)
      axios.get("http://localhost:8080/students/user/" + localStorage.getItem("userId"))
      .then(({ data }) => {
        setStudentIdAccept(data.data.id)
      })
    } else if(localStorage.getItem("profileType") === "2"){
      setIsStudent(false)
      axios.get("http://localhost:8080/teachers/user/" + localStorage.getItem("userId"))
      .then(({ data }) => {
        setTeacherIdAccept(data.data.id)
      })
    }
  }

  const getClassDetails = (id) => {
    axios.get("http://localhost:8080/class_details/classroom/" + id)
    .then(({ data }) => {
      setPrice(data.data.price)
      const formatedDate = data.data.start_date.split("T")[0].split('-').reverse().join('/')
      setStartDate(formatedDate)
      setClassDuration(data.data.class_duration)
      setEndExpectation(data.data.end_expectation)
      setOnline(data.data.online ? "Sim": "Não")
      setAvailable(data.data.available ? "Sim": "Não")
      setOrigin(data.data.origin === "offered" ? "Oferecida" : "Sugerida")

      setStudentCanAccept(data.data.available)
      if (!data.data.available && !data.data.teacher_id)
        setTeacherCanAccept(true)

      axios.get("http://localhost:8080/classrooms/" + id)
      .then(({ data }) => {
        setClassName(data.data.name)
        setTeacherId(data.data.teacher_id)
        getTeacher(data.data.teacher_id)

        axios.get("http://localhost:8080/subjects/" + data.data.subject_id)
        .then(({ data }) => {
          setSubject(data.data.name)
        })

        axios.get("http://localhost:8080/classrooms/" + id + "/students")
        .then(({ data }) => {
          setClassroomStudents(data.data)
        })
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
      <p><strong>Início:</strong> {startDate}</p>
      <p><strong>Aulas necessárias:</strong> {endExpectation} aulas</p>
      <p><strong>Duração das aulas:</strong> {classDuration} horas</p>
      <p><strong>Online?</strong> {online}</p>
      <p><strong>Disponível?</strong> {available}</p>
      <p><strong>Origem:</strong> {origin}</p>
      <Stack direction="horizontal" gap={1}>
        <span><strong>Professor:</strong> </span>
        {
          teacherId 
          ? <a href={`/profile/${teacherId}`}>{teacherName}</a>
          : <span>Não definido</span>
        }
      </Stack>

      {
        classroomStudents.length > 0
        ? classroomStudents.map(s => {
          return (
            <p className="mt-2" key={s.id}>
              <strong>Alunos: </strong>
              <a href={`/profile/${s.id}`}>{s.name}</a>, </p>
          )
        })
        : <p>Nenhum aluno cadastrado</p>
      }
      
      {
        isStudent && studentCanAccept &&
        <Button className="mt-4" onClick={handleStudentAccept.bind(this)}>
          Aceitar
        </Button>
      }

      {
        !isStudent && teacherCanAccept &&
        <Button className="mt-4" onClick={handleTeacherAccept.bind(this)}>
          Aceitar
        </Button>
      }

      { shouldRedirect && <Navigate replace to={`/class/list`} />}

    </div>
  )
}