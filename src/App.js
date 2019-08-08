import React from "react";
import { MDBDataTable } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const data = {
    columns: [
      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'WorkItem',
        field: 'workItem',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Due Date',
        field: 'dueDate',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Resource',
        field: 'resource',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 150
      }
    ],
    rows: [
        {
          id: '1',
          workItem: 'Analysis',
          dueDate: '2019/08/08',
          resources: '3',
          status: 'Done'
        },
        {
            id: '2',
            workItem: 'Wireframe Design',
            dueDate: '2019/08/08',
            resources: '3',
            status: 'Overdue'
        },

        {
            id: '3',
            workItem: 'Mock up',
            dueDate: '2019/08/08',
            resources: '3',
            status: 'Inprogress'
        },
        {
            id: '4',
            workItem: 'API Development',
            dueDate: '2019/08/24',
            resources: '2',
            status: 'Inprogress'
        }
    ]
};      


localStorage.setItem('workItems', JSON.stringify(data));

class App extends React.Component{

    constructor(props){
        super(props)
    
        this.state = {
          WorkItems: JSON.parse(localStorage.getItem('workItems'))
        }
    }

    handleAddEvent(evt){
        var WorkItem = {
          id:"",
          WorkItem:"",
          dueDate:"",
          resources:"",
          status:""
        }
        this.state.WorkItems.push(WorkItem);
        this.setState(this.state.WorkItems);
    }


    render (){      
        const Itemslength = data.rows.length;
        return (
            <div className="container">
                <div className="row">
                <div className="col-md-12">
                    <h1 className="text-primary">Work Log Manager</h1>
                </div>
                <div className="h-divider"></div>
                <div className="col-md-12">
                    <h5 className="float-right">No.of work Items: {Itemslength}</h5>
                </div>
                </div>
                <div className="row float-right">
                    <button style={{margin:"1px"}} className="btn btn-primary btn-sm">Upload to Google Sheet</button>
                    <button style={{margin:"1px"}} className="btn btn-primary btn-sm">Add Item</button>
                </div>
            <br/>
            <br/>
            <div className="row">
                <div className="col-md-12">
                    <MDBDataTable
                        striped
                        bordered
                        hover
                        data={this.state.WorkItems}
                    />
                </div>
            </div>
            </div>
        );

    }

};

export default App;

// It supports editable options but its not free
//<MDBTableEditable data={data} columns={columns} striped bordered />