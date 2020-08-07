import React, { Component } from 'react'
import Edit from './Edit'
import {Table,Button} from 'semantic-ui-react'
export default class View extends Component {
    state={
        isOpen:false,
        id:"",
    }
    onUserDelete=(id)=>{
        this.props.onDelete(id);

    }
    onEditClick=(id)=>{
        this.setState({isOpen:true,id:id})
    }
    onClose=()=>{
        this.setState({isOpen:false})
    
    }
    
    render() {
        const {data,getUserById,onEdit} = this.props
        const {isOpen,id}=this.state
        return (
            <section><Edit isOpen={isOpen} isClose={this.onClose} id={id} getUserById={getUserById} onEdit={onEdit}></Edit>
            <Table sortable celled fixed>
                <Edit></Edit>
                <Table.Header>
                    <Table.Row>
                     <Table.HeaderCell>Username</Table.HeaderCell>
                     <Table.HeaderCell>Bio</Table.HeaderCell>
                     <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                    
                </Table.Header>
                <Table.Body>
                    {data.map((user)=>(
                         <Table.Row key={user.id}>
                             <Table.Cell>{user.name}</Table.Cell>
                             <Table.Cell>{user.bio}</Table.Cell>
                             <Table.Cell><Button onClick={this.onEditClick.bind(this,user.id)}>Edit</Button><Button onClick={this.onUserDelete.bind(this,user.id)}>Delete</Button></Table.Cell>
                     </Table.Row>
                    )

                    )}
                    
                </Table.Body>

            </Table></section>
            
            
               
        );
    }
}
