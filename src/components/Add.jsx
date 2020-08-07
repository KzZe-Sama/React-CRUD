import React, { Component } from 'react'
import { Modal, Button, Form, } from "semantic-ui-react";
import { uuid } from "uuidv4";
export default class Add extends Component {
    state={
        id:uuid(),
        name:"",
        bio:""
    };
    onInputChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value,});
    }
    onFormSubmit=(event)=>{
        event.preventDefault();
        this.props.onSubmit(this.state)
        this.setState({name:"",bio:""})
    }
    render() {
        const {name,bio}=this.state
        
        return (
        <Modal trigger={<Button>Add Quote</Button>}>
            <Modal.Header>Add Quote</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.onFormSubmit}>
                        <Form.Input name="name" label="User Name" value={name} onChange={this.onInputChange}></Form.Input>
                        <Form.TextArea name="bio" label="Bio" placeholder="Write Something." value={bio} onChange={this.onInputChange}></Form.TextArea>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Modal.Content>
            
        </Modal>
            
            );
         
    }
} 
