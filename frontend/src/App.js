import React, { useState, useEffect } from 'react';
// import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import InfoScreen from './Screens/InfoScreen';
import ConfigEditScreen from './Screens/ConfigEditScreen';
import MetaMaskConnector from './Screens/MetaMaskConnector';
import CreateAddress from './Screens/CreateAddress';
import EditAddress from './Screens/EditAddress';
import DeleteScreen from './Screens/DeleteScreen';
import HomeScreen from './Screens/HomeScreen';
// import UserLogin from './Components/UserLogin';
import useToken from './Components/useToken';
import LoginScreen from './Screens/LoginScreen';
import HistoryScreen from './Screens/HistoryScreen';

function App () {

  // const isFirstRender = useRef(true);
  const [running, setRunning] = useState("")
  const { token, setToken } = useToken();

  useEffect(() => {
    evalRunning()
    // setInterval(() => evalRunning(), 5000)
    if (running) {
      run_cycle()
    } else {
      console.log("trading bot is turned off")
    }
  },[running])

  // useEffect(() => {
  //   evalRunning()
  //   // setInterval(() => evalRunning(), 5000)
  //   setInterval(() => setRender(!render), 2000)
  // },[render])
  

  const run_cycle = () => {
    console.log("running...")
  }
  
  const evalRunning = async() => {
    await axios.get("api/running/")
      // .then((response) => { console.log(response.data); return response })
      .then((response) => setRunning(response.data[0].running))
      .catch((error) => console.log(error))
  }

  if (!token) {
    return <LoginScreen setToken={setToken} />
  }

    return (
      <BrowserRouter>
        <div>
          <main>
            <Routes>
              <Route path="/" element={<Navigate replace to="/home"/>}/>
              <Route path='/home' element={<HomeScreen/>}/>
              <Route path="/info" element={<InfoScreen/>}/>
              <Route path="/editconfig" element={<ConfigEditScreen/>}/>
              <Route path="/metamask" element={<MetaMaskConnector/>}/>
              <Route path="/createaddress" element={<CreateAddress/>}/>
              <Route path="/editaddress" element={<EditAddress/>}/>
              <Route path="/deleteaddress" element={<DeleteScreen/>}/>
              <Route path="/history" element={<HistoryScreen/>}/>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    );


}

export default App;

// function App() {
//   return (
//     <BrowserRouter>
//       <div>
//         <main>
//           <Routes>
//             <Route path="/" element={<Navigate replace to="/info"/>}/>
//             <Route path="/info" element={<InfoScreen/>}/>
//             <Route path="/editconfig" element={<ConfigEditScreen/>}/>
//           </Routes>
//         </main>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;


// function App () {
//   const [status, setStatus] = useState("empty");
//   // let count = 0;

//   const run_cycle = () => {
//     // setTimeout(function () {
//     //   console.log("running...")
//     // }, 5000);
//     console.log("running...")
//   }

//   const evalRunning = async() => {
//     const { data } = await axios.get('/api/config/')
//     let info = data[0].running
//     // console.log(info)
//     setStatus(info)

//     // console.log(data[0].running)
//     // setStatus(data[0].running)
//     console.log(status)
//       // .then((response) => setStatus(response.data[0].running))
//       // .then((response) => console.log(response.data[0].running))
//       // .then(() => count++)
//       // .then(() => console.log(count))
//       // .then(() => console.log("Running:" + String(running)))
//       // .then((response) => console.log(response.data[0].running))
//       // .then(() => console.log(String(running)))
//       // .then(() => console.log(status))
//       // .catch((error) => console.log(error))
//       // return info
//   }

//   useEffect(() => {
//     setInterval(() => tradingprocess(), 5000)
//   }, [status]);

//   const tradingprocess = () => {
//     evalRunning()


//     // console.log(status)
//     // console.log(status)
//     // setTimeout(function () {
//     //   while (running) {
//     //     evalRunning()
//     //     if (!running) {
//     //       break;
//     //     }
//     //     run_cycle()
//     //   }
//     //   console.log("Trading bot is turned off")
//     // }, 5000)

//     // console.log(String(running))

//     // if (running) {
//     //   // console.log("running is true")
//     //   run_cycle()
//     // } else {
//     //   console.log("running is false")
//     // }

//     // while (true) {
//     //   setTimeout(function () {
//     //     while (running) {
//     //       evalRunning()
//     //       if (!running) {
//     //         break;
//     //       }
//     //       run_cycle()
//     //     }
//     //     console.log("Trading bot is turned off")
//     //   }, 5000)
//     // }
//   }

// class App extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       running:false
//     }
//   }

// class App extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       running: false,

//     }
//   }