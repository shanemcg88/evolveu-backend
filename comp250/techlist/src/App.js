import React from 'react';
import './App.css';
import Home from './components/Home'
import TechComp from './components/TechComp'
import Jobs from './components/Jobs'
import Parts from './components/Parts'
import { NavLink, Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      displayTech: false,
      techs: [],
      jobs: [],
      parts: [],
    }
  }

 
componentDidMount() {
    Promise.all([
        fetch("http://127.0.0.1:5000/tech"),
        fetch("http://127.0.0.1:5000/jobs"),
        fetch("http://127.0.0.1:5000/parts")
    ])
    .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
    .then(([techsData, jobsData, partsData]) => { console.log('jobsData ', jobsData) 
    this.setState({
        techs: techsData,
        jobs: jobsData,
        parts: partsData
    })})
}


updateState = (e) => {
  this.setState({techs: e})
}

updateJobs = (e) => {
  this.setState({jobs: e})
}

updateParts = (e) => {
  this.setState({parts: e})
}

  render() {
    console.log('job state', this.state.jobs)
    return (
      <Router>
        <div className="App">
          <h1>hi</h1>
          <NavLink
            to='/'>
              Home
          </NavLink>
          <NavLink
            to='/jobs'>
              Jobs
          </NavLink>
          <NavLink to='/techs'>
              Technicians
          </NavLink>
          <NavLink to='/parts'>
              Parts
          </NavLink>

            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/techs'
                render={() => (
                  <TechComp 
                    passUpdateState={this.updateState}
                    passTechs={this.state.techs}/>
                )}/>
              <Route path='/jobs' 
                render={() => (
                  <Jobs
                    passJobs={this.state.jobs}
                    passUpdateJobs={this.updateJobs}
                    passTechs={this.state.techs}/>
                )}/>
              <Route path='/parts'
                render={() => (
                  <Parts
                    passParts={this.state.parts}
                    passUpdateParts={this.updateParts}
                    passJobs={this.state.jobs} />                    
                )}/>
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
