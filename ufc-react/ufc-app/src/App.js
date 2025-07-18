import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';

function App() {

  const [fighters, setFighters] = useState();

  const getFighters = async () =>{

    try {
      const response = await api.get("api/fighters");

      console.log(response.data);
      setFighters(response.data);

    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getFighters();
  },[])

  return (
    <div className="App">

    </div>
  );
}

export default App;
