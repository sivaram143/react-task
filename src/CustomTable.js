// Custom Table

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import WorkItem from './components/WorkTable'
import AddWork from './components/AddWork'

const WorkItems = [
  {
    id: 1,
    WorkItem: "Analysis",
    dueDate: '2019-08-07',
    resources:3,
    Actions:""
  },
  {
    id: 2,
    WorkItem: "Start Templating",
    dueDate: '2019-08-12',
    resources:4,
    Actions:""
  },
  {
    id: 3,
    WorkItem: "Wireframe Design",
    dueDate: '2019-08-20',
    resources: 2,
    Actions:""
  }
]

localStorage.setItem('WorkItems', JSON.stringify(WorkItems))

class CustomTable extends Component {

  constructor(props){
    super(props)

    this.state = {
      WorkItems: JSON.parse(localStorage.getItem('WorkItems'))
    }

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  componentWillMount(){
    const workItems = this.getworkItems()

    this.setState({WorkItems})
  }

  getworkItems(){
    return this.state.workItems
  }

/////////////////////////

  onAdd(id, WorkItem, dueDate, resources, Actions){
    const workItems = this.getworkItems()

    workItems.push({
      id,
      WorkItem,
      dueDate,
      resources,
      Actions
    })

    this.setState({workItems})
  }

  onDelete(id){
    const workItems = this.getworkItems()

    const filteredWorkItems = workItems.filter(workItem => {
      return workItems.id !== id
    })

    this.setState({workItems:filteredWorkItems})
  }

  onEditSubmit(id, WorkItem){
    let workItems = this.getworkItems();

    workItems = workItems.map(workItem => {
      if(workItem.id === id){
          workItem.id = id
          workItem.WorkItem = WorkItem
      }

      return workItems
    })

    this.setState({workItems})
  }
  handleAddEvent(evt){
     var WorkItem = {
       id:"",
       WorkItem:"",
       dueDate:"",
       resources:""
     }
     this.state.WorkItems.push(WorkItem);
     this.setState(this.state.WorkItems);
  }

  renderTableHeader(){
    let header = Object.keys(this.state.WorkItems[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  renderTableData (){
     return this.state.WorkItems.map((work, index) => {
        const {id, WorkItem, dueDate, resources} = work
        return (
           <tr key={id}>
               <td>{id}</td>
               <td>{WorkItem}</td>
               <td>{dueDate}</td>
               <td>{resources}</td>
               <td>
                   <button onClick={this.onEditSubmit} className="btn"><i className="fa fa-edit text-primary"></i></button>
                   <button onClick={this.onDelete} className="btn"><i className="fa fa-trash text-danger"></i></button>
               </td>
           </tr>
        )
     })
  }

  render() {
    const Itemslength = this.state.WorkItems.length;
    return (
      <div className="container">
        <div className="row">
           <div className="col-md-12">
              <h1 className="text-primary">Work Log Manager</h1>
           </div>
           <div className="col-md-12">
              <h5 className="float-right">No.of work Items: {Itemslength}</h5>
           </div>
        </div>
        <div className="row float-right">
            <button style={{margin:"1px"}} className="btn btn-primary btn-sm">Upload to Google Sheet</button>
            <button style={{margin:"1px"}} className="btn btn-primary btn-sm" onClick={this.handleAddEvent.bind(this)}>Add Item</button>
        </div>
        <div className="row">
           <table className="table table-bordered">
               <tr>{this.renderTableHeader}</tr>
               {this.renderTableData}
           </table>
        </div>

      </div>
      )
  }
}



export default CustomTable;