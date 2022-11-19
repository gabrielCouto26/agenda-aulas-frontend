import React from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default class NewClass extends React.Component {
  state = {
    name: "",
    subject_id: null,
    subjects: [],
    price: 0,
    startDate: "",
    classDuration: 0,
    endExpectation: 0,
    origin: "",
    online: false,
    invalidInputs: false,
    shouldRedirect: false,
    error: false,
    profileType: ""
  }

  handleNameChange = (e) => this.setState({ name: e.target.value })
  handleSubjectChange = (e) => this.setState({ subject_id: e.target.value })
  handlePriceChange = (e) => this.setState({ price: parseFloat(e.target.value) })
  handleStartDateChange = (e) => {
    const date = e.target.value.replace(/-/g, '/')
    this.setState({ startDate: date})
  }
  handleClassDurationChange = (e) => this.setState({ classDuration: e.target.value })
  handleEndExpectationChange = (e) => this.setState({ endExpectation: e.target.value })
  handleOnlineChange = (e) => this.setState({ online: e.target.checked })
  handleAvailableChange = (e) => this.setState({ available: e.target.value })
  handleCreate = async (e) => {
    e.preventDefault()

    if(!this.state.name || !this.state.subject_id || !this.state.price || 
      !this.state.startDate || !this.state.classDuration || !this.state.endExpectation ||
      this.state.online == null){
        this.setState({ invalidInputs: true })
        this.setState({ shouldRedirect: false })
    } else if(this.state.profileType === "1") {
      this.studentCreate()
    } else if(this.state.profileType === "2") {
      this.teacherCreate()
    } else {
      this.setState({ error: true })
    }
  }

  async componentDidMount(){
    const { data } = await axios.get("http://localhost:8080/subjects")
    this.setState({ 
      subjects: data.data,
      profileType: localStorage.getItem("profileType")
    })

  }

  studentCreate = async () => {
    const { data } = await axios.get("http://localhost:8080/students/user/" + localStorage.getItem("userId"))

    await axios.post("http://localhost:8080/students/" + data.data.id + "/classrooms",
      { "classroom": { name: this.state.name, subject_id: this.state.subject_id } }
    ).then(async ({ data }) => {
      if(data.status === 200){
        await axios.post("http://localhost:8080/class_details", {
          "class_detail": {
            price: this.state.price,
            start_date: this.state.startDate,
            class_duration: this.state.classDuration,
            end_expectation: this.state.endExpectation,
            online: this.state.online,
            available: false,
            origin: "requested",
            classroom_id: data.data.id
          }
        })

        this.setState({ shouldRedirect: true})
      }
      else if(data.status === 500)
        this.setState({ error: true })
    }).catch(e => {
      this.setState({ invalidInputs: true })
    })
  }

  teacherCreate = async () => {
    const { data } = await axios.get("http://localhost:8080/teachers/user/" + localStorage.getItem("userId"))

    await axios.post("http://localhost:8080/teachers/" + data.data.id + "/classrooms",
      { "classroom": { name: this.state.name, subject_id: this.state.subject_id } }
    ).then(async ({ data }) => {
      if(data.status === 200){
        await axios.post("http://localhost:8080/class_details", {
          "class_detail": {
            price: this.state.price,
            start_date: this.state.startDate,
            class_duration: this.state.classDuration,
            end_expectation: this.state.endExpectation,
            online: this.state.online,
            available: true,
            origin: "offered",
            classroom_id: data.data.id
          }
        })

        this.setState({ shouldRedirect: true})
      }
      else if(data.status === 500)
        this.setState({ error: true })
    }).catch(e => {
      this.setState({ invalidInputs: true })
    })
  }

  render() {
    return (
      <Stack>
        <h1>Cadastro</h1>
        <Form className="mt-4">
          {this.state.invalidInputs && <small style={{ color: "red" }}>Preencha todos os campos</small>}
          {this.state.error && <small style={{ color: "red" }}>Falha no servidor</small>}
          <Form.Group className="mb-3">
            <Form.Label>Nome da classe</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome"
              onChange={this.handleNameChange.bind(this)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tópico</Form.Label>
            <Form.Select
              onChange={this.handleSubjectChange.bind(this)}
            >
              <option>Selecione um tópico</option>
              { this.state.subjects.map(s => {
                return (
                  <option value={s.id} key={s.id}>{ s.name }</option>
                )
              }) }
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Preço</Form.Label>
            <Form.Control
              type="number"
              placeholder="Preço"
              onChange={this.handlePriceChange.bind(this)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data de início</Form.Label>
            <Form.Control
              type="date"
              placeholder=""
              onChange={this.handleStartDateChange.bind(this)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Expectativa de término em</Form.Label>
            <Form.Control
              type="number"
              placeholder="10 aulas"
              onChange={this.handleEndExpectationChange.bind(this)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Duração das aulas em horas</Form.Label>
            <Form.Control
              type="number"
              placeholder="1 hora"
              onChange={this.handleClassDurationChange.bind(this)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Stack direction="horizontal" className="align-items-center">
              <Form.Label>Online</Form.Label>
              <Form.Check 
                type="switch"
                id="online-switch"
                onClick={this.handleOnlineChange.bind(this)}
              />
            </Stack>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.handleCreate}>
            Cadastrar
          </Button>
        </Form>
  
        { this.state.shouldRedirect && <Navigate replace to="/dashboard" />}
      </Stack>
    )
  }
}