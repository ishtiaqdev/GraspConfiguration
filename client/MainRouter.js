import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import CropImage from './grasp/CropImage'
import GraspList from './grasp/GraspList'
import Menu from './core/Menu'

const MainRouter = () => {
    return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/cropimage" component={CropImage}/>
        <Route path="/list" component={GraspList}/>
      </Switch>
    </div>)
}

export default MainRouter
