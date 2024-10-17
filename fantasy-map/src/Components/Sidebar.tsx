import {useEffect, useState} from "react";
import MapLocation from "../DataObjects/MapLocation";
import "../Pages/EditMapPage.css"
type SidebarProps = {
    data: number[]
    addSelection:(dimensions:number[], name:string) => void
    csv: MapLocation[]
    save:() => void
}



function Sidebar({data, addSelection, csv}:SidebarProps){
    const [locationName, setLocationName] = useState<string>("");

    useEffect(() => {
        setLocationName("")
    }, [data]);

    function handleName(val:string){
        setLocationName(val)
    }

    function handleAdd(){
        if(locationName != ""){
            addSelection(data, locationName)
            setLocationName("")
        }
    }

    function LocationList() {
        return(
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Starting X</th>
                    <th>Starting Y</th>
                    <th>Ending X</th>
                    <th>Ending Y</th>
                    <th>Layer</th>
                </tr>
                </thead>
                <tbody>
                {csv.map((row, index) => (
                    <tr key={index} style={{backgroundColor: ((index % 2 == 0) ? "lightgray" : "lightcyan")}}>
                        <td>{row.name}</td>
                        <td>{row.starting_x.toFixed(3)}</td>
                        <td>{row.starting_y.toFixed(3)}</td>
                        <td>{row.ending_x.toFixed(3)}</td>
                        <td>{row.ending_y.toFixed(3)}</td>
                        <td>{row.order}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }



    if(data.length == 4) {


        return (
            <div className={"sidebar-container"} style={{height:window.innerHeight}}>
                <div>
                    <h3>You've Selected: </h3>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
                        <p><b>Starting X:</b> {data[0].toFixed(4)}</p>
                        <p><b>Starting Y:</b> {data[1].toFixed(4)}</p>
                    </div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
                        <p><b>Ending X:</b> {data[2].toFixed(4)}</p>
                        <p><b>Ending Y:</b> {data[3].toFixed(4)}</p>
                    </div>

                </div>
                <div className={"input-container"}>

                    Name: <input value={locationName} placeholder={"Location Name"}
                            onChange={(val)=>handleName(val.target.value)}/>
                    <button onClick={handleAdd}>Add</button>

                </div>

                <div className={"location-list-container"}>
                   <LocationList/>

                </div>
            </div>
        )
    } else {
        return (
            <div className={"sidebar-container"} style={{height:window.innerHeight}}>
                <div>
                    <h3>Waiting for Click... </h3>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
                        <p><b>Starting X:</b></p>
                        <p><b>Starting Y:</b></p>
                    </div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
                        <p><b>Ending X:</b></p>
                        <p><b>Ending Y:</b></p>
                    </div>

                </div>
                <div className={"input-container"}>

                    Name: <input value={locationName} placeholder={"Location Name"}
                                 onChange={(val)=>handleName(val.target.value)}/>
                    <button onClick={handleAdd}>Add</button>

                </div>

                <div className={"location-list-container"}>
                    <LocationList/>

                </div>
            </div>
        )
    }
}

export default Sidebar;