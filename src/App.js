import Add from './components/Add'
import View from './components/View'
import {Container,Input} from 'semantic-ui-react'
import React, { Component } from 'react'
import users from './api/users';


export default class App extends Component {
  state={
    users:[
    ],
    query:"",
    results:[],
  };
  // Life Cycke Method which runs one time always and doesnot need to be called
  componentDidMount(){
    this.fetchDataDB();
  }
  // Arrow function
  fetchDataDB=async()=>{
    // Storing  Response in a constant named Response
    // 
    const Response=await users.get("/users");
    this.setState({users:Response.data});
  }
  // For Live Search Functioning  
  onSearchInputChange=(event)=>{
    const value=event.target.value;
    const {users}=this.state;
    this.setState({query:value});
    const results=users.filter((user)=>{
      const regx=new RegExp(value,"gi");
      return user.name.match(regx);
    });
    this.setState({results});
  };
  onUserDelete=async(id)=>{
      // const {users}=this.state;
      // this.setState({users:users.filter((user)=>user.id !== id)})
      await users.delete(`/users/${id}`);
      this.fetchDataDB();

  }
  onFormSubmit=async(user)=>{
    await users.post('/users',user);
    this.fetchDataDB()
  };
  getUserById=(id)=>{
        const {users}=this.state
        const user=users.filter((user)=>user.id === id);
        return user[0];
  }
  onEdit=async(id,updatedUser)=>{
    console.log(updatedUser)
    console.log(id)
    // const {users}=this.state
    // this.setState({users:users.map((user)=>user.id===id ? updatedUser:user)})
    await users.patch(`/users/${id}`,updatedUser)
    this.fetchDataDB()
;
  };
  render() {
    // Selecting user data from state
    const {users,query,results}=this.state
    const data=results.length===0 && !query ? users:results;
    return (
        <Container>
          
          <Add onSubmit={this.onFormSubmit}></Add>
          <Input icon="search" placeholder="Search" onChange={this.onSearchInputChange}></Input>
          {/* Here data={user is passing props to the view class or to the frontend} */}
          <View data={data} onDelete={this.onUserDelete} getUserById={this.getUserById} onEdit={this.onEdit}></View> 
        </Container>
      
    )
  }
}
