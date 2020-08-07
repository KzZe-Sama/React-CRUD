import React, { Component } from 'react'
import { Modal, ModalHeader, ModalContent, Form, Button } from "semantic-ui-react";
export default class edit extends Component {
    state={
        id:"",
        name:"",
        bio:"",
    }
    componentDidUpdate(prevProps){
        if (prevProps.id !== this.props.id){
            const user=this.props.getUserById(this.props.id)
            this.setState({id:user.id,name:user.name,bio:user.bio})
        }
    }
    onChangeHandleInput=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    onOutClick=()=>{
        this.props.isClose()
    }
    onFormSubmit=(event)=>{
        event.preventDefault();
        this.props.onEdit(this.props.id,this.state);
        this.props.isClose();
    }
    render() {
       const {name,bio}=this.state
       const {isOpen}=this.props
        return (
            <Modal open={isOpen} onClose={this.onOutClick}>
                <ModalHeader>Edit User</ModalHeader>
                <ModalContent>
                    <Form onSubmit={this.onFormSubmit}>
                        <Form.Input label="UserName" value={name} name="name" onChange={this.onChangeHandleInput}></Form.Input>
                        <Form.Input label="Bio" value={bio} name="bio" onChange={this.onChangeHandleInput}></Form.Input>
                        <Button content="Submit" type="submit"></Button>
                    </Form>
                </ModalContent>
            </Modal>
        )
    }
}
