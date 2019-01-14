
class Header extends React.Component{
  render() {
    return (
      
      <div className="jumbotron bg-info text-white">
      <h1>Sean Thunquest</h1>
        <h3>Computer Science Major at Colorado State University</h3>
        <h5>(970) 227 - 2881</h5>
        <a className="text-white" href="mailto:sthunquest@gmail.com">sthunquest@gmail.com</a>
        </div>
    )
  }
}

class Languages extends React.Component{
  render(){
    return(
    <div className="card">
        <div className="card-body">
          <div className="card-header bg-info text-white">
     <h1 className="card-title">Languages</h1>
          </div>
          <li className="list-group-item">C/C++</li>
           <li className="list-group-item">Java</li>
           <li className="list-group-item">Python</li>
        </div>
     </div>
    )
  }
}

class Projects extends React.Component{
  render(){
    return(
    <div className="card">
        <div className="card-body">
          <div className="card-header bg-info text-white">
     <h1 className="card-title">Projects</h1>
          </div>
           <li className="list-group-item">Raspberry Pi Image Recognition Rock Paper Scisors Game using OpenCV</li>
         <li className="list-group-item">Web Scraping Database Builder with web interface</li>
            <li className="list-group-item">Document siumularity search engine with target reading level range</li>
        </div>
     </div>
    )
  }
}

class Experience extends React.Component{
  render(){
    return(
    <div className="card">
    <div className="card-body">
      <div className="card-header bg-info text-white">
    <h2 className="card-title">Experience</h2>
    <h5 className="card-title">Teaching Assistant</h5>
      </div>
      <div className="card-header bg-warning">
        <h6>Operating Systems</h6>
      </div>
   <ul>
      <li className="list-group-item">Algorithms</li>
      <li className="list-group-item">Computer Architecture</li>
      <li className="list-group-item">Parallel Programming</li>
      <li className="list-group-item">POSIX</li>
      </ul>
    <div className="card-header bg-warning">
      <h6>Computer Organization</h6>
      </div>
    <ul>
        <li className="list-group-item">C Programming</li>
      <li className="list-group-item">CPU Architechture</li>
      <li className="list-group-item">Assembly language on a RISC processor</li>
    </ul>
       </div> 
         </div>
    )
  }
}

class Research extends React.Component{
  render(){
    return(

       <div className="card">
         <div className="card-body">
           <div className="card-header bg-info text-white">
         <h1 className="card-title">Research</h1>
           </div>
         
          <li className="list-group-item"> Operational Intensity Analysis</li>
          <li className="list-group-item"> Polyheadral Code Generation Tools</li>
         <li className="list-group-item"> Hardware Accelerators simulating RNA folding</li>
         
        
         </div> 
       </div>

    )
  }
}

class Education extends React.Component{
  render(){
    return(
  <div className="card">
        
    <div className="card-body">
      <div className="card-header bg-info text-white">
    <h2 className="card-title">Education</h2>
    <h6 className="card-title">Colorado State University, persuing Computer Science Degree</h6>
      <p>Fall 2009 - Fall 2010 and returned Spring 2017 - Current</p>
      </div>
    
       <div className="row">
      <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6">
      <div className="card">
      <div className="card-body">
        <div className="card-header bg-warning">
        <h5 className="card-title">GPA</h5>
        </div>
        <li className="list-group-item">Cumulative: 3.46</li>
        <li className="list-group-item">2017 - Current: 4.0</li>
        </div>
      </div>
      </div>
      <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6">
      <div className="card">
      <div className="card-body">
        <div className="card-header bg-warning">
    <h4 className="card-title">Current Coarses</h4>
        </div>
    <li className="list-group-item">Software Engineering</li>
    <li className="list-group-item">Algorithms - Theory and Practice</li>
    <li className="list-group-item">Physics - Calculus Based</li>
    <li className="list-group-item"> Writing in Digital Environmnets</li>
      </div>
         </div>
      </div>
        <div className="col-12">
      <div className="card">
      <div className="card-body">
        <div className="card-header bg-warning">
    <h5 className="card-title"> Courses Completed</h5>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6">
    <li className="list-group-item">Software Development with C++</li>
    <li className="list-group-item">Operating Systems</li>
    <li className="list-group-item">Algorithms and Data Structures</li>
    <li className="list-group-item">Object Oriented Problem Solving</li>
    <li className="list-group-item">Computer Organization</li>
    <li className="list-group-item">Digital Circuit Logic</li>
    <li className="list-group-item">Introduction to Unix</li>
          </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6">
    <li className="list-group-item">Linear Algebra</li>
    <li className="list-group-item">Calculus 2</li>
    <li className="list-group-item">Introduction to Statisistics</li>
    <li className="list-group-item">Logic and Critical Thinking</li>
    <li className="list-group-item">Principles of Microeconomics</li>
    <li className="list-group-item">U.S. History since 1876</li>
    <li className="list-group-item">College Composition</li>
    <li className="list-group-item">Music Appreciation</li>
        </div>
      </div>
      </div>
    </div>
    
    </div>
    
  </div>
  </div>
       </div>

    )
  }
}

class Main extends React.Component {
  render() {
    return (
      <div className="container">
      
        <div className="row">
          <div className="col-12">
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-5 col-md-5 col-xl-3">
              <Languages />
          </div>
          <div className="col-xs-12 col-sm-7 col-md-7 col-xl-9">
             <Projects />
          </div>
          </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-xl-3">
        <Experience />
          </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-xl-3">
        <Research />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-xl-6">
        <Education />
          </div>
      </div>
     </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
