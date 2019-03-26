import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      tasks: [],
      newTaskData: {
        id: '',
        description: '',
        duedate: '',
        class: '',
      },
      newTaskModal: false
    }
  }

  componentWillMount(){
    this._refreshList();
  }

  //enable/disable add task modal
  toggleNewTaskModal() {
    this.setState({
      newTaskModal: ! this.state.newTaskModal
    });
  }

  //post request to add a new task to the REST API
  addTask() {
    axios.post('http://localhost:3000/tasks', this.state.newTaskData).then((response) => {
    let { tasks } = this.state;  
    tasks.push(response.data);
      this.setState({ tasks, newTaskModal: false, newTaskData: {
        id: '',
        description: '',
        duedate: '',
        class: ''
      }});
      this._refreshList();
    });
  }

  //delete request to remove a task of the REST API
  deleteTask(id) {
    axios.delete('http://localhost:3000/tasks/' + id).then((response) => {
      this._refreshList();
    });
  }

  //get request to update task state with the data from the REST API
  _refreshList() {
    axios.get('http://localhost:3000/tasks').then((response) => {
      this.setState({
        tasks: response.data
      })
    });
  }

  render() {

    let tasks = this.state.tasks.map((task) => {
      return (
        <tr key={task.id}>
          <td>{task.id}</td>
          <td>{task.description}</td>
          <td>{task.duedate}</td>
          <td>{task.class}</td>
          <td>
            <Button color="danger" size="sm" onClick={this.deleteTask.bind(this, task.id)}>Delete</Button>
          </td>
        </tr>
      )
    });

    return (

      <div className="app-container">

      <h1>Tasks List</h1>
      <Button className="my-3" color="primary" onClick={this.toggleNewTaskModal.bind(this)}>Add Task</Button>

      <Modal isOpen={this.state.newTaskModal} toggle={this.toggleNewTaskModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewTaskModal.bind(this)}>Add a new task</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="description">ID</Label>
            <Input id="description" value={this.state.newTaskData.id} onChange={(e) => {
              let { newTaskData } = this.state;
              newTaskData.id = e.target.value;
              this.setState({ newTaskData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input id="description" value={this.state.newTaskData.description} onChange={(e) => {
              let { newTaskData } = this.state;
              newTaskData.description = e.target.value;
              this.setState({ newTaskData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="duedate">Due date</Label>
            <Input id="duedate" value={this.state.newTaskData.duedate} onChange={(e) => {
              let { newTaskData } = this.state;              
              newTaskData.duedate = e.target.value;
              this.setState({ newTaskData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="class">Class</Label>
            <Input id="class" value={this.state.newTaskData.class} onChange={(e) => {
              let { newTaskData } = this.state;              
              newTaskData.class = e.target.value;
              this.setState({ newTaskData });
            }} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addTask.bind(this)}>Add Task</Button>
          <Button color="secondary" onClick={this.toggleNewTaskModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
      
        <Table>
            <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Due date</th>
                  <th>Class</th>
                  <th>Actions</th>
                </tr>
            </thead>
            <tbody>
              {tasks}
            </tbody>
        </Table> 
      </div>
    );
  }
}

export default App;
