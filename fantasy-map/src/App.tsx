import React, {useState} from 'react';

import './App.css';
import OnePieceMap from "./resources/onepieceworldmap.jpeg";
import MapPage from "./Pages/MapPage";
import EditMapPage from "./Pages/EditMapPage";

function App() {
    const [isEditing, setIsEditing] = useState<boolean>(true)
    const base_url = "https://onepiece.fandom.com/wiki/"
    const csv = './one_piece_map_locations.csv'
    function handleSave(){
        setIsEditing(false)
    }

    function handleEdit() {
        setIsEditing(true)
    }
    function SupplyMap() {
        if(isEditing){
            return(
                <EditMapPage map={OnePieceMap} csv_file={csv}/>
            )
        } else {
            return(
                <MapPage map={OnePieceMap} base_url={base_url} csv_file={csv}/>
            )
        }
    }

  return (
    <div className="App">
      <SupplyMap/>
    </div>
  );
}

export default App;
