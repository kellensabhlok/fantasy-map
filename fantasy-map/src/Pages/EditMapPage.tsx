import React, {useState, useEffect, useRef} from "react";

import EditMapComponent from "../Components/EditMapComponent";
import Sidebar from "../Components/Sidebar";
import MapLocation from "../DataObjects/MapLocation";
import "./MapPage.css"
import "./EditMapPage.css"
import Papa from "papaparse";

// import BackgroundImage from "../resources/old-vintage-compass-on-ancient-map.jpg"

type MapPageProps = {
    map:string
    csv_file:string
}

function EditMapPage({map, csv_file}: MapPageProps){

    const [selected, setSelected] = useState<number[]>([])
    const [initialCSV, setInitialCSV] = useState<string[]>([]);
    const [locations, setLocations] = useState<MapLocation[]>([]);
    const iframe = useRef(null)

    useEffect(() => {
        fetch( csv_file )
            .then( response => response.text() )
            .then( responseText => {
                // console.log(responseText)

                parseCSV(responseText)
            });

    }, []);

    // useEffect(()=> {
    //     if(locations.length > 1 && initialCSV.length > 1 && locations.length > initialCSV.length){
    //         saveCsv()
    //     }
    // }, [locations])


    function parseCSV(data:string){
        let lines = data.split("\n")
        setInitialCSV(lines)
        if(lines.length > 0) {
            lines.shift()
            let vals:MapLocation[] = []
            lines.forEach((line) => {

                line.replace("\r","")
                vals.push(new MapLocation(line))
            })
            setLocations(vals)


        }

    }

    function handleAdd(dimensions:number[], name:string){
        let dimension_string = dimensions.join(",")
        let line = name + "," + dimension_string
        let loc = new MapLocation(line)
        setLocations([...locations, loc])


    }

    function handleSave(){

    }

    function saveCsv(){

        const csv = Papa.unparse(locations);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "modified.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }


    function handleMapClick(dimensions:number[]){

        setSelected(dimensions)

    }

    // function findLocation(dimensions:number[]): string {
    //     let loc = ""
    //     let order = -1
    //     locations.forEach((l) =>{
    //         let [x,y] = dimensions;
    //         if(x > l.starting_x && x < l.ending_x  && y > l.starting_y && y < l.ending_y && l.order > order){
    //             loc = l.name
    //             order = l.order
    //         }
    //     });
    //
    //     return loc;
    // }


    return(
        <div className={"layout"} >

            <EditMapComponent source={map} sendDataToParent={handleMapClick}/>
            {/*<iframe id="iframe" className={"POOP"} ref={iframe} sandbox={"allow-forms allow-pointer-lock allow-same-origin allow-scripts"} src={display} width={"40%"}/>*/}
            <Sidebar data={selected} addSelection={handleAdd} csv={locations} save={handleSave}/>
        </div>

    )
}


export default EditMapPage;