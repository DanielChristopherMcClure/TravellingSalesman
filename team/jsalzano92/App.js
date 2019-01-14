class Header extends React.Component {
  render() {
    return (
    <div className="bg-secondary text-white rounded-bottom p-2 mb-4">
      <h3><b>Joseph-Jonathan Salzano</b></h3>
      <div className="row">
        <div className="col-sm-6 col-12">
          <i><p>jsalzano@rams.colostate.edu<br />
            (970)212-6503<br />
            www.cs.colostate.edu/~jsalzano</p></i>
        </div>
        <div className="col-sm-6 col-12">
          <p className="float-right"><i>950 Big Thompson Ave.<br />Unit #2132<br /> Estes Park, CO 80517</i></p>
        </div>
      </div>
    </div>
    );
  }
}

class Education extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header bg-secondary text-white">
          <h5>Education</h5>
        </div>
        <div className="card-body">
          <h6>
            <b>Colorado State University
              <span className="float-right">
                <i>2019</i>
              </span>
            </b>
          </h6>
          <p>
            <span className="float-right">
              GPA: 3.9
            </span>
            Major: Computer Science<br/>
            Minor: Mathematics
          </p>
          <ul>
            <li>Introduction to Distributed Systems</li>
            <li>Parallel Programming</li>
            <li>Systems Security</li>
            <li>Algorithms Theory and Practice</li>
            <li>Computer Organization and Architecture</li>
            <li>Operating Systems</li>
            <li>Software Development w/ C++</li>
            <li>Computer Organization</li>
            <li>Algorithms and Data Structures</li>
            <li>Object-Oriented Problem Solving</li>
          </ul>
          <br/>
          <h6>
            <b>Harvard Extension School
              <span className="float-right">
                <i>2014</i>
              </span>
            </b>
          </h6>
          <p>CS-50 Course</p>
          <br/>
          <h6>
            <b>Mozilla Labs Design Challenge
              <span className="float-right">
                <i>2009</i>
              </span>
            </b>
          </h6>
          <p>Training in the concept of browsers featuring FireFox. Seminars teaching prototyping using JavaScript, JQuery.</p>
        </div>
      </div>
    );
  }
}
class Skills extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header bg-secondary text-white">
          <h5>Skills</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-xl-6 col-md-12 col-sm-6">
              <h6><b>Software Development</b></h6>
              <ul>
                <li>C</li>
                <li>C++</li>
                <li>OpenMP</li>
                <li>MPI</li>
                <li>CUDA</li>
                <li>C#</li>
                <li>Java</li>
                <li>Assembly</li>
                <li>Windows IOCP</li>
                <li>Computer Architecture</li>
                <li>Software Design</li>
                <li>Software Structure</li>
                <li>Client/Server Networking</li>
                <li>Bluetooth Dev (Windows/Linux)</li>
                <li>Game Development</li>
                <li>Torque Script</li>
                <li>GUI Programming</li>
              </ul>
            </div>
            <div className="col-xl-6 col-md-12 col-sm-6">
              <h6><b>Web Development</b></h6>
              <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>PHP</li>
                <li>MySQL</li>
                <li>JavaScript</li>
                <li>Node.js</li>
                <li>NWJS</li>
                <li>Jquery</li>
                <li>Laravel - MVC</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class Experience extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header bg-secondary text-white">
          <h5>Experience</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-xl-6 col-12">
              <h6><b>HP Inc.
                <span className="float-right">
                  <i>2017-Current</i>
                </span>
                </b></h6>
              <ul>
                <li>Software Engineering Intern</li>
                <i><li>Workstations R&amp;D</li></i>
              </ul>
              <br/>
            </div>
            <div className="col-xl-6 col-12">
              <h6><b>Undergraduate Research
                <span className="float-right">
                  <i>2017-Current</i>
                </span>
                </b></h6>
              <ul>
                <li>Accelerator Architecture</li>
                <i><li>Accelerators for Sorting</li>
                  <li>Sorting Accelerators for Exascale</li></i>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class Interests extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header bg-secondary text-white">
          <h5>Interests</h5>
        </div>
        <div className="card-body">
          <ul>
            <li>Aerospace Platforms</li>
            <li>Defence Applications</li>
            <li>Research &amp; Development</li>
            <li>Embedded Systems</li>
            <li>Systems Architecture</li>
            <li>Software Engineering</li>
            <li>Accelerated Architecture</li>
            <li>Performance</li>
          </ul>
        </div>
      </div>
    );
  }
}
class Memberships extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header bg-secondary text-white">
          <h5>Memberships</h5>
        </div>
        <div className="card-body">
          <h6><b>
            Association for Computing Machinery<br />CSU Student Chapter
            </b></h6>
          <ul>
            <li>Member - since 2016</li>
            <li>Vice President - since 2017</li>
          </ul>
        </div>
      </div>
    );
  }
}
class Awards extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header bg-secondary text-white">
          <h5>Awards</h5>
        </div>
        <div className="card-body">
          <h6><b>College of Natural Science - Deans List</b></h6>
          <ul>
            <li>Spring 2016 - 4.0 GPA</li>
            <li>Fall 2016 - 4.0 GPA</li>
            <li>Spring 2017 - 4.0 GPA</li>
          </ul>
          <h6><b>Mozilla Labs Design Challenge Finalist</b></h6>
          <ul>
            <li>2009</li>
          </ul>
        </div>
      </div>
    );
  }
}
class Projects extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header bg-secondary text-white">
          <h5>Projects</h5>
        </div>
        <div className="card-body">
          <h6><b>SPECwpc 3.0 – (Javascript, Node, NWJS, C++, Windows)</b></h6>
          <ul>
            <li>Developed brand new User Interface and GUI for SPECwpc.</li>
            <li>Built from ground up for Command Line Interaction with many new features to allow for performance testing support.</li>
            <li>Developed new benchmark for GPU compute using the Caffe learning framework from BVLC.</li>
          </ul>
          <h6><b>Sorter Accelerator Architecture – (Java, C, Python, Logisim)</b></h6>
          <ul>
            <li>Research Project to look at Accelerated Architectures as a strategy to combat Dark Silicon.</li>
            <li>Designed a Sorting circuit and Controller state machine in Logisim.</li>
            <li>Wrote both a new Library for Logisim as well as modified the existing program to build a driver for the circuit.</li>
          </ul>
          <h6><b>Raspberry Pi Controlled Parcle Drop Box – (C, Python, Linux)</b></h6>
          <ul>
            <li>CS370 Term Project</li>
            <li>When a load cell connected to the pi senses the weight of the package there is an alert sent via web app to a smartphone.</li>
            <li>With the smartphone, a user can see the weight of the package and choose to lock to box.</li>
            <li>Raspberry Pi sends signals to servo motors controlling the locks.</li>
          </ul>
          <h6><b>Key Value Store Networking and Database Project – (C, Linux)</b></h6>
          <ul>
            <li>Client processes can store and receive files through ports from Server.</li>
            <li>Server handles client connections with separate threads.</li>
          </ul>
          <h6><b>YMCA of the Rockies Label Maker – (C#)</b></h6>
          <ul>
            <li>Streamlined and simplified label printing for buffet lines.</li>
            <li>Reduced training time and printing time needed.</li>
          </ul>
          <h6><b>TGEA Squadron Leader Game – (C++, Torque Script, PHP, MySQL)</b></h6>
          <ul>
            <li>Online space combat simulator game built using the Torque Game Engine Advanced.</li>
            <li>Modified and added to the C++ source code of the game engine to fit game.</li>
            <li>User account system implemented using web server and interfaced with by PHP and MySQL.</li>
          </ul>
          <div className="row">
            <a className="btn btn-secondary col-12 col-sm-5 m-sm-auto m-1 mt-4" role="button" href="http://www.cs.colostate.edu/~jsalzano/projects.php">More Details</a>
            <a className="btn btn-secondary col-12 col-sm-5 m-sm-auto m-1 mt-4" role="button" href="http://www.cs.colostate.edu/~jsalzano/examples.php">Examples</a>
          </div>
        </div>
      </div>
    );
  }
}

class BodyLayout extends React.Component {
  render() {
    return (
    <div className="row">
        <div className="col-lg-7 col-md-6 col-12 mb-4">
          <Education />
        </div>
        <div className="col-lg-5 col-md-6 col-12 mb-4">
          <Skills />
        </div>
        <div className="col-lg-7 col-md-6 col-12 mb-4">
          <Experience />
        </div>
        <div className="col-lg-5 col-md-6 col-12 mb-4">
          <Interests />
        </div>
        <div className="col-lg-7 col-md-6 col-12 mb-4">
          <Memberships />
        </div>
        <div className="col-lg-5 col-md-6 col-12 mb-4">
          <Awards />
        </div>
        <div className="col-12 mb-4">
          <Projects />
        </div>
    </div>
    );
  }
}

class MainLayout extends React.Component {
  render() {
    return (
      <div className="container col-md-10 col-12">
        <Header />
        <BodyLayout />
      </div>
    );
  }
}

ReactDOM.render(<MainLayout />, document.getElementById("main"));
