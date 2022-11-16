import React from "react";
import axios from "axios";
import { Stack } from "react-bootstrap";
import ListClasses from "../components/listClasses";

export default class Dashboard extends React.Component{
    state = {
        availableClasses: [],
        sugestedClasses: [],
        subjects: []
    }

    async componentDidMount() {
        await axios.get('http://localhost:8080/dashboard')
        .then(({ data }) => {
            this.setState({
                availableClasses: data.data.available || [],
                sugestedClasses: data.data.sugested || [],
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
            <Stack gap={5} className="mt-4">
                <ListClasses title="Classes disponíveis" classes={this.state.availableClasses}/>
                <ListClasses title="Classes sugeridas" classes={this.state.sugestedClasses}/>
                <ListClasses title="Tópicos" classes={this.state.subjects}/>
            </Stack>
        )
    }
}