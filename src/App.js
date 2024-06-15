import { Routes,Route } from "react-router-dom";
import Home from "./component/Home";
import Quiz from "./component/Quiz";

function App() {
  // const [detail,setDetail]=useState({name:"",date:"",email:""})
  return (
    // detail={detail} setDetail={setDetail}
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/quiz" element={<Quiz/>}/>
      </Routes>
    </div>
  );
}

export default App;