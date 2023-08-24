import LoginDialog from "./Components/LoginForm/LoginDIalog";
import AppChild from "./AppChild";
import SubmittedForm from './Components/SubmittedForm'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  return (
    <>
      {/* <GoogleOAuthProvider clientId="267034138399-21c0pgqmf674ekrr6bpeut2khqfpddvc.apps.googleusercontent.com"> */}
        <Router>
          <Routes> 
            {/* <Route exact path="/" element ={<LoginDialog />}></Route> */}
            <Route  path="/" element={<AppChild />} />
            <Route path="/submittedform" element={<SubmittedForm />} />
          </Routes>
        </Router>
      {/* </GoogleOAuthProvider> */}
    </>
  );
}

export default App;
