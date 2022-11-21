import React from "react";
import axios from "axios";
import { Stack } from "react-bootstrap";
import ListClasses from "../components/listClasses";

export default class Dashboard extends React.Component{
    state = {
        availableClasses: [],
        sugestedClasses: [],
        subjects: [],
        profile: localStorage.getItem("profileType") === "1" ? "artist" : "teacher",
        requestedText: localStorage.getItem("profileType") === "1" ? "por mim" : "por alunos"
    }

    async componentDidMount() {
        await axios.post('http://localhost:8080/dashboard', {
          "dashboard": {
            "user_id": localStorage.getItem("userId"),
            "profileType": localStorage.getItem("profileType")
          }
        })
        .then(({ data }) => {
            this.setState({
                availableClasses: data.data.available || [],
                sugestedClasses: data.data.requested || [],
                subjects: data.data.subjects || [],
            })
        })
        .catch(e => {
            console.log("Erro ao buscar informações do Dashboard")
            console.log(e)
        })
    }

    render(){
        return (
            <Stack gap={4} className="mt-4">
                <ListClasses href="class" title="Classes disponíveis" classes={this.state.availableClasses}/>
                <ListClasses href="class" title={`Classes sugeridas ${this.state.requestedText}`} classes={this.state.sugestedClasses}/>
                <ListClasses href="subject" title="Tópicos" classes={this.state.subjects}/>
            </Stack>
        )
    }
}