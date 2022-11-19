import axios from "axios";
import React from "react";
import { Stack } from "react-bootstrap";
import ListClasses from "../components/listClasses";

export default class MyClasses extends React.Component {
  state = {
    inProgress: [],
    offered: [],
    finished: []
  }

  async componentDidMount() {
    const { data } = await axios.get("http://localhost:8080/teachers/user/" + localStorage.getItem("userId"))
    console.log("data", data)
    await axios.get("http://localhost:8080/teachers/" + data.data.id + "/classrooms")
      .then(async ({ data }) => {
        if(data.status === 200){
          let inProgress = []
          let finished = []
          let offered = []
          for(let c of data.data){
            const response = await axios.get("http://localhost:8080/class_details/classroom/" + c.id)
            let classDetail = response.data.data
            let haveBegun = new Date(classDetail.start_date) > new Date()
            if(classDetail.available === true && haveBegun)
              inProgress.push(c)
            else if(classDetail.origin === "offered" && !haveBegun)
              offered.push(c)
            else
              finished.push(c)
          }
          this.setState({ inProgress, offered, finished })
        }
      })
    
  }

  render() {
    return (
      <Stack gap={4} className="mt-4">
        <ListClasses title="Classes em andamento" classes={this.state.inProgress}/>
        {
          localStorage.getItem("profileType") === "2" &&
          <ListClasses title="Classes oferecidas" classes={this.state.offered}/>
        }
        <ListClasses title="Classes finalizadas" classes={this.state.finished}/>
      </Stack>
    )
  }
}