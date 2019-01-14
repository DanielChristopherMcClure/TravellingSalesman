import React, {Component} from 'react';
var FontAwesome = require('react-fontawesome');

class StaffPageLayout extends Component {
    constructor(props){
        super(props);
        this.state = {}
        this.renderIcons = this.renderIcons.bind(this);
        this.renderCarter = this.renderCarter.bind(this);
        this.renderMcClure = this.renderMcClure.bind(this);
        this.renderSalzano = this.renderSalzano.bind(this);
        this.renderThunquest = this.renderThunquest.bind(this);
    }

    renderIcons(website, linkedin) {
      return(
        <p>
          <a className="staff_icons" href={website}><FontAwesome name='laptop'/></a>
          <a className="staff_icons" href={linkedin}><i className="fab fa-linkedin"></i></a>
        </p>
      )
    }

    renderCarter() {
      return(
        <div className="col-10" style={{marginTop:"40px"}}>
          <span style={{float: "left", marginRight: "30px"}}>
            <img src={require('../static/Carter_Pic.png')} width="125" height="125"/>
          </span>
          <span>
            <h5>John Carter</h5>
            {this.renderIcons("http://www.cs.colostate.edu/~jbcarter/JCJR", "https://www.linkedin.com/in/john-carter-7b4a0b123/")}
            <p>Interdisciplinary Liberal Arts Major with a double Minor in Computer Science and Japanese.</p>
            <p>コロラド州立大学の学生です。専攻は学際的なリベラルアーツで副専攻はコンピュータサイエンスと日本語です。</p>
          </span>
        </div>
      )
    }

    renderMcClure() {
      return(
        <div className="col-10 offset-2" style={{textAlign:"right", marginTop:"40px"}}>
          <span style={{float: "right", marginLeft: "30span>x"}}>
            <img src={require('../static/McClure_Pic.png')} width="125" height="125"/>
          </span>
          <span>
            <h5>Dan McClure</h5>
            {this.renderIcons("http://www.cs.colostate.edu/~mcclured/", "https://www.linkedin.com/in/dan-mcclure-4105a359/")}
            <p style={{textAlign:"left"}}>I enjoy being outside, I like rock climbing, hiking, camping, fishing, hunting
             and pretty much any sport as long as it makes me move.
            I am a member of the Colorado State University Rock Climbing Team, with the team
            I have went to nationals twice and taken 1st and 2nd place in the nation.
            I enjoy the challenge rock climbing imposes, I am the same way technologically.
            I like to be challenged by a programming project, or by some technical issue.
            I really enjoy automation and trying to emulate human intelligence in code.</p>
          </span>
        </div>
      )
    }

    renderSalzano() {
      return(
        <div className="col-10" style={{marginTop:"40px"}}>
          <span style={{float: "left", marginRight: "30px"}}>
            <img src={require('../static/Salzano_Pic.png')} width="125" height="125"/>
          </span>
          <span>
            <h5>Joseph-Jonathan Salzano</h5>
            {this.renderIcons("http://www.cs.colostate.edu/~jsalzano", "https://www.linkedin.com/in/jsalzano")}
            <p>Computer Science Major focusing on embedded systems and accelerator research. Minioring in Mathamatics.
            Software Engineer Intern at HP Inc. working in Workstations R&D.</p>
          </span>
        </div>
      )
    }

    renderThunquest() {
      return(
        <div className="col-10 offset-2" style={{textAlign:"right", marginTop:"40px"}}>
          <span style={{float: "right", marginLeft: "30px"}}>
            <img src={require('../static/Thunquest_Pic.png')} width="125" height="125"/>
          </span>
          <span>
            <h5>Sean Thunquest</h5>
            {this.renderIcons("http://www.cs.colostate.edu/~sgthun/Tech-Sploration", "https://www.linkedin.com/in/sean-thunquest")}
            <p style={{textAlign:"left"}}>My passion for interesting problems and cool technology has brought me to the Computer Science Major at CSU.
            I am excited to be continuing my education through an internship with Hewlett Packard Enterprise.</p>
          </span>
        </div>
      )
    }

    render() {
        return(
          <div className="col-12 card" style={{borderRadius:0,borderTop:0,borderColor:"#aaa",padding:0}}>
            <div className="card-body norm">
              <div className="row">
                {this.renderCarter()}
                {this.renderMcClure()}
                {this.renderSalzano()}
                {this.renderThunquest()}
              </div>
            </div>
          </div>
        )
    }
}

export default StaffPageLayout;
