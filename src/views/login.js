import React, { useEffect, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [profileType, setProfileType] = useState(null)
  const [userId, setUserId] = useState(null)
  const [registered, setRegistered] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [invalidInputs, setInvalidInputs] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)
  const handleLogin = async (e) => {
    e.preventDefault()
    if(!email || !password){
      setInvalidInputs(true)
      setShouldRedirect(false)
    } else {
      await axios.post("http://localhost:8080/login",
        { email, password }
      ).then(({ data }) => {
        if (data.status === 204) {
          setShouldRedirect(true)
          setUserId(data.data.user_id)
          setProfileType(data.data.profile_type)
        } else if (data.status === 401) {
          setErrorMessage(data.data)
        } else if (data.status === 404) {
          setErrorMessage(data.data)
        } else {
          setErrorMessage("Falha no servidor")
        }
      }).catch(e => {
        setRegistered(false)
      })
    }
  }

  useEffect(() => {
    localStorage.setItem("userId", userId)
    localStorage.setItem("profileType", profileType)
  }, [userId, profileType])

  return(
    <Stack>
      <h1>Login</h1>
      <Form className="mt-4">
        { registered && <p style={{color: "red"}}>Usuário não cadastrado</p> }
        { invalidInputs && <small style={{color: "red"}}>Preencha todos os campos</small> }
        { errorMessage && <small style={{color: "red"}}>{errorMessage}</small> }

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Insira o email cadastrado"
            onChange={handleEmailChange.bind(this)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insira a senha cadastrada"
            onChange={handlePasswordChange.bind(this)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleLogin.bind(this)}>
          Entrar
        </Button>
      </Form>

      <p className="mt-4">Ainda não é cadastrado? Cadastre-se <Link to="/register">aqui</Link>.</p>

      { shouldRedirect && <Navigate replace to={`/dashboard`} />}
    </Stack>
  )
}