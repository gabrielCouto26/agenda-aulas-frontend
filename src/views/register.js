import React, { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

import axios from "axios";

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [birth_date, setBirthDate] = useState("")
  const [_type, setProfileType] = useState(0)
  const [registered, setRegistered] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [invalidInputs, setInvalidInputs] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleNameChange = (e) => setName(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)
  const handleBirthDateChange = (e) => setBirthDate(e.target.value)
  const handleProfileTypeChange = (e) => setProfileType(parseInt(e.target.value))
  const handleRegister = async (e) => {
    e.preventDefault()
    if (!name || !email || !password || !birth_date || !_type) {
      setInvalidInputs(true)
      setShouldRedirect(false)
    } else {
      create_user()
    }
  }

  const create_user = async () => {
    await axios.post("http://localhost:8080/users",
      {
        "user": { name, email, password, birth_date },
        "profile": { _type }
      }
    ).then(({ data }) => {
      if (data.status === 200)
        setShouldRedirect(true)

      const userId = data.data.id
      if (_type === "1")
        create_student(userId)
          .catch(e => {
            setErrorMessage("Falha ao cadastrar aluno")
            console.log(e)
          })
      else if (_type === "2")
        create_teacher(userId)
          .catch(e => {
            setErrorMessage("Falha ao cadastrar professor")
            console.log(e)
          })

      else if (data.status === 500)
        setRegistered(true)
    }).catch(e => {
      setErrorMessage("Falha ao cadastrar usuário")
      console.log(e)

      setInvalidInputs(true)
    })
  }

  const create_student = async (user_id) => {
    return await axios.post("http://localhost:8080/students", { user_id })
  }

  const create_teacher = async (user_id) => {
    return await axios.post("http://localhost:8080/teachers", { user_id })
  }

  return (
    <Stack>
      <h1>Cadastro</h1>
      <Form className="mt-4">
        {registered && <p style={{ color: "red", margin: ".2em" }}>Usuário já cadastrado</p>}
        {invalidInputs && <small style={{ color: "red", margin: ".2em" }}>Preencha todos os campos</small>}
        {errorMessage && <small style={{color: "red", margin: ".2em"}}>{errorMessage}</small>}
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Seu nome"
            onChange={handleNameChange.bind(this)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Seu email de preferência"
            onChange={handleEmailChange.bind(this)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Uma senha forte"
            onChange={handlePasswordChange.bind(this)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Data de nascimento</Form.Label>
          <Form.Control
            type="date"
            placeholder="Data de nascimento"
            onChange={handleBirthDateChange.bind(this)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Sou</Form.Label>
          <Form.Select
            onChange={handleProfileTypeChange.bind(this)}
          >
            <option>Selecione um tipo</option>
            <option value="1">Aluno(a)</option>
            <option value="2">Professor(a)</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleRegister}>
          Cadastrar
        </Button>
      </Form>

      <p className="mt-4">Já é cadastrado? Faça login <Link to="/">aqui</Link>.</p>

      {shouldRedirect && <Navigate replace to="/" />}
    </Stack>
  )
}