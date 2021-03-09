import React, { Component } from 'react';
import FloatingInput from '../FloatingInput/floatingInput';
import dataId from '../IdGenerator/dataId';
import SideDrawer from '../SideDrawer/SideDrawer';
import './table.css';

class Table extends Component {
    state = {
        singleData: {
            name: '',
            email: '',
            phone: '',
            city: '',
            id: ''
        },
        data: [],
        slider: false,
    }
    drawerCloseHandler = (id) => {
        this.setState({ slider: false })
    }
    drawerOpenHandler = () => {
        this.setState({ slider: true })
    }

    addDetailHandler = () => {
        let tempSingleData = {
            name: '',
            email: '',
            phone: '',
            city: '',
            id: ''
        }
        this.setState({ slider: true, singleData: tempSingleData })
    }

    submitDetailHandler = (id) => {
        let data
        if (id) {
            data = [...this.state.data]
            for (let singledata in data) {
                let dataId = data[singledata].id
                if (dataId === id) {
                    data[singledata] = this.state.singleData
                    break;
                }
            }
        }
        else {
            let updatedData = {
                ...this.state.singleData,
                id: dataId()
            }
            data = this.state.data.concat(updatedData)
        }
        let updatedSingleData = {
            name: '',
            email: '',
            phone: '',
            city: '',
            id: ''
        }
        let singleData = {
            ...this.state.singleData
        }
        let validity = this.validationHandler(singleData)
        if (validity) {
            this.setState({ data: data, singleData: updatedSingleData, slider: false })
        }
    }

    onChangeHandler = (event) => {
        let field = event.target.id
        let singleDataCopy = {
            ...this.state.singleData
        }
        singleDataCopy[field] = event.target.value
        this.setState({ singleData: singleDataCopy })
    }

    editEventHandler = (id) => {
        let tempdata = [...this.state.data]
        let tempSingleData
        for (let singledata in tempdata) {
            let dataId = tempdata[singledata].id
            if (dataId === id) {
                tempSingleData = tempdata[singledata]
                break;
            }
        }
        this.setState({ singleData: tempSingleData, slider: true })
    }

    deleteEventHandler = (id) => {
        let access = window.confirm('Are you sure');
        if (access) {
            let tempdata = [...this.state.data]
            for (let data in tempdata) {
                let dataId = tempdata[data].id
                if (dataId === id) {
                    tempdata.splice(data, 1)
                    break;
                }
            }
            this.setState({ data: tempdata })
        }
    }

    validationHandler = (data) => {
        if (data.name === '') {
            alert('Enter valid name')
            return false
        } else if (data.email === '' || !(/^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]){2,7}$/.test(data.email))) {
            alert('Enter valid email')
            return false
        } else if (data.phone === '' || !(/^([0-9]){10}$/.test(data.phone))) {
            alert('Enter valid phone')
            return false
        } else if (data.city === '') {
            alert('Enter valid city')
            return false
        } else {
            return true
        }
    }

    render() {
        let table;
        if (this.state.data.length > 0) {
            table = <div className='table-responsive'>
                <table className="table table-sm table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">city</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            this.state.data.map((data, index) => (
                                <tr key={data.id} id={data.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.phone}</td>
                                    <td>{data.city}</td>
                                    <td><button type="button" className="btn btn-warning" id={'edit' + data.id} onClick={() => this.editEventHandler(data.id)}>Edit</button></td>
                                    <td><button type="button" className="btn btn-danger" id={'delete' + data.id} onClick={() => this.deleteEventHandler(data.id)}>Delete</button></td>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>
            </div>
        }


        return (
            <React.Fragment>
                <SideDrawer open={this.state.slider}>
                    <div className='p-5'>
                        <FloatingInput type='name' id='name' placeholder='Name' for='name' label='Name' value={this.state.singleData.name} changed={this.onChangeHandler} />
                        <FloatingInput type='email' id='email' placeholder='Email' for='email' label='Email' value={this.state.singleData.email} changed={this.onChangeHandler} />
                        <FloatingInput type='phone' id='phone' placeholder='Phone' for='phone' label='Phone' value={this.state.singleData.phone} changed={this.onChangeHandler} />
                        <FloatingInput type='city' id='city' placeholder='City' for='city' label='City' value={this.state.singleData.city} changed={this.onChangeHandler} />
                        <button type="button" className="btn btn-danger mt-5 me-5" onClick={() => this.drawerCloseHandler(this.state.singleData.id)}>Cancel</button>
                        <button type="button" className="btn btn-primary mt-5" onClick={() => this.submitDetailHandler(this.state.singleData.id)}>Save</button>
                    </div>
                </SideDrawer>
                <button type="button" className="btn btn-primary my-5" onClick={this.addDetailHandler}>Add Details</button>
                {table}
            </React.Fragment>
        )
    }
}

export default Table