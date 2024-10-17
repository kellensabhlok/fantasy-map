import React, {useState, useEffect, useRef} from "react";
import OnePieceMap from "../resources/onepieceworldmap.jpeg";
import MapComponent from "../Components/MapComponent";
import Sidebar from "../Components/Sidebar";
import MapLocation from "../DataObjects/MapLocation";
import "./MapPage.css"

type MapPageProps = {
    map:string
    csv_file:string
    base_url:string
}


function MapPage({map, csv_file, base_url}:MapPageProps){
    const baseURL = base_url

    // const [display, setDisplay] = useState<string>("Waiting For Click")
    const [display, setDisplay] = useState<string>(baseURL)
    const [locations, setLocations] = useState<MapLocation[]>([]);
    const iframe = useRef(null)
    useEffect(() => {
        fetch( csv_file)
            .then( response => response.text() )
            .then( responseText => {
                // console.log(responseText)
                parseCSV(responseText)
            });

    }, []);

    function parseCSV(data:string){
        let lines = data.split("\n")
        if(lines.length > 0) {
            let headers = lines.shift()?.replace("\r","").split(",")
            let vals:MapLocation[] = []
            lines.forEach((line) => {
                // console.log(line)
                line.replace("\r","")
                vals.push(new MapLocation(line))
            })
            setLocations(vals)
            // console.log(headers)

        }

    }

    function handleMapClick(dimensions:number[]){
                // FINDING LOCATIONS FUNCTIONALITY
        let text = "Map Clicked at X: "+dimensions[0]+", Y: "+dimensions[1]
        text += " Zoom: "+dimensions[2]


        // setDisplay(text)

                //LOAD THE WIKI PAGE
        setDisplay(baseURL + findLocation(dimensions))
    }

    function findLocation(dimensions:number[]): string {
        let loc = ""
        let order = -1
        locations.forEach((l) =>{
            let [x,y] = dimensions;
            if(x > l.starting_x && x < l.ending_x  && y > l.starting_y && y < l.ending_y && l.order > order){
                loc = l.name
                order = l.order
            }
        });

        return loc;
    }


    return(
        <div className={"layout"} >

                <MapComponent source={map} sendDataToParent={handleMapClick}/>
                <iframe id="iframe" className={"POOP"} ref={iframe} sandbox={"allow-forms allow-pointer-lock allow-same-origin allow-scripts"} src={display} width={"40%"}/>
                {/*<Sidebar url={display}/>*/}
        </div>

    )
}


export default MapPage;