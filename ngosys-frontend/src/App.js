import './App.css';
import Homepage from './componentsvol/homepage/homepage';
import Loginvol from './componentsvol/loginvol/loginvol';
import Registervol from './componentsvol/registervol/registervol';
import Registerngo from './componentsngo/registerngo/registerngo';
import Loginngo from './componentsngo/loginngo/loginngo';
import Homepagengo from './componentsngo/homepagengo/homepagengo';
import Addevents from './componentsngo/addevent/addevents';
import Firstpage from './firstpage/firstpage';
import Detailevent from './commoncomponent/detailEvent/detailevent';
import Registeredevents from './commoncomponent/detailEvent/registeredevents';
import Contactus from './commoncomponent/contactus/contactus';
import { useState } from 'react';
import Detaileventngo from './componentsngo/eventdetailsngo/eventdetailsngo';
import Updatengo from './componentsngo/updatengo/updatengo';
import Updatevol from './componentsvol/updatevol/updatevol';
import Updateevents from './componentsngo/updateevent/updateevent';

import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
} from "react-router-dom";



function App() {
  const [user, setLoginVolunteer] = useState({})
  const [user1, setLoginNGO] = useState({})
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Firstpage />
          </Route>
          <Route path="/updateevent">
            {
              <Updateevents />
            }
          </Route>
          <Route path="/homepage" >
            <Homepage />
            {/* {
        user && user._id ?<Homepage setLoginVolunteer={setLoginVolunteer}/>
        : <Loginvol setLoginVolunteer={setLoginVolunteer} />
      }     */}

          </Route>


          <Route path="/loginvol">
            <Loginvol setLoginVolunteer={setLoginVolunteer} />
          </Route>
          <Route path="/registervol">

            <Registervol />
          </Route>
          <Route path="/homepagengo" >
            <Homepagengo />
            {/* {
        user1 && user1._id ?<Homepagengo setLoginNGO={setLoginNGO}/>
        : <Loginngo setLoginNGO={setLoginNGO} />
      }     */}

          </Route>

          <Route path="/loginngo">
            <Loginngo setLoginNGO={setLoginNGO} />
          </Route>
          <Route path="/updatevol">
            {
              <Updatevol />
            }
          </Route>
          <Route path="/updatengo">
            {
              <Updatengo />
            }
          </Route>

          <Route path="/registerngo">
            <Registerngo />

          </Route>
          <Route path="/addevents">
            <Addevents />

          </Route>

          <Route path="/Event/:eventId">
            {
              <Detailevent />
            }
          </Route>
          <Route path="/Eventngo/:eventId">
            {
              <Detaileventngo />
            }
          </Route>
          {/* <Route path="/updatengo">
            {
              <Updatengo />
            }
          </Route> */}


          <Route path="/registeredevents">
            {
              <Registeredevents />
            }
          </Route>

          <Route path="/contactus">
            <Contactus />
          </Route>

        </Switch>
      </Router>
      {/* <Loginngo/> */}



    </div>
  );
}

export default App;