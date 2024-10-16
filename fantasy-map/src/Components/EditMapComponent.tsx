import React, {useState, useRef, useEffect} from "react";
import "../Pages/MapPage.css"
import {Dimensions, useImageSize} from "react-image-size";
import "../Pages/EditMapPage.css"
type MapProps = {
    source:string;
    sendDataToParent:(dimensions:number[]) => void;
}

function EditMapComponent({source, sendDataToParent}:MapProps){
    const [scrollPosition, setScrollPosition] = useState<number[]>([0,0]);
    const [imageSize, {loading, error}] = useImageSize(source);
    const scrollRef = useRef(null);
    const [mapDimensions, setMapDimensions] = useState<number[]>([window.innerWidth*0.6, window.innerHeight])
    const [zoom, setZoom] = useState<number>(1);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [initial, setInitial] = useState<number[]>([0,0]);
    const [end, setEnd] = useState<number[]>([0,0]);
    const [start, setStart] = useState<number[]>([0,0])
    const handleScroll = () => {

        if(scrollRef.current){
            const { scrollTop, scrollLeft } = scrollRef.current;
            setScrollPosition([ scrollTop, scrollLeft ]);

        }
    };

    useEffect(() => {
        resetZoom()
    }, [imageSize]);
    function handleClick(e: React.MouseEvent) {
        if(imageSize?.width && imageSize?.height) {

            let width = scrollPosition[1] + e.clientX
            let height = scrollPosition[0] + e.clientY

            // let click = [width / imageSize[0], height/imageSize[1]]
            let click = [(width / imageSize.width)/zoom, (height/imageSize.height)/zoom, zoom]

            sendDataToParent(click)

        }

    }

    function handleMouseDown(e: React.MouseEvent) {
        if(imageSize?.width && imageSize?.height) {
            setIsDragging(true)
            let width = scrollPosition[1] + e.clientX
            let height = scrollPosition[0] + e.clientY

            // let click = [width / imageSize[0], height/imageSize[1]]
            let click = [(width / imageSize.width)/zoom, (height/imageSize.height)/zoom]

            setInitial(click)
            setStart([e.clientX, e.clientY])
            setEnd([e.clientX, e.clientY])

        }
    }

    function handleMouseMove(e: React.MouseEvent){
        if(isDragging){

            let width = e.clientX
            let height = e.clientY

            setEnd([width, height])


        }
    }

    function handleMouseUp(e: React.MouseEvent) {
        if(imageSize?.width && imageSize?.height) {



            let width = scrollPosition[1] + e.clientX
            let height = scrollPosition[0] + e.clientY

            // let click = [width / imageSize[0], height/imageSize[1]]
            let click = [(width / imageSize.width)/zoom, (height/imageSize.height)/zoom]

            let temp = initial
            temp.push(click[0], click[1])
            sendDataToParent(temp)

            setIsDragging(false)
            // setEnd([0,0])
            // setInitial([0,0])
            // setStart([0,0])

        }
    }

    function resetZoom() {
        if(imageSize){
            setZoom(window.innerHeight/imageSize.height)
            setMapDimensions([imageSize.width, imageSize.height])
        }
    }

    const zoomIn = () =>{
        if(window.innerHeight*(zoom + 0.05) <= mapDimensions[1])
            setZoom(zoom + 0.05)

    }
    const zoomOut = () =>{
        if(mapDimensions[1]*(zoom - 0.05)>= window.innerHeight)
            setZoom(zoom - 0.05)
    }


    const reset = () => {
        resetZoom()
    }
    return(
        <div className={"map-container"}
             ref={scrollRef}
             style={{height:window.innerHeight}}
             onScroll={handleScroll}>

            <img src={source} alt={"map"} className={"map"} style={{height:mapDimensions[1]*zoom}}
                onMouseDown={(e)=>handleMouseDown(e)}
                 onMouseMove={(e) =>handleMouseMove(e)}
                 onMouseUp={(e)=>handleMouseUp(e)}
                draggable={false}
            />
                 {/*// onClick={(e)=>handleClick(e)}/>*/}
            <div className={"zoom-buttons-container"}>
                <button className={"zoom-button-class"} onClick={zoomIn}>Zoom In</button>
                <button className={"zoom-button-class"} onClick={zoomOut}>Zoom Out</button>
                <button className={"zoom-button-class"} onClick={reset}>Reset</button>
            </div>
            <div className={"highlight"} style={{
                opacity:'30%',
                left:start[0],
                top:start[1],
                right:window.innerWidth - end[0],
                bottom:window.innerHeight - end[1],
            }}
            onMouseMove={(e)=>handleMouseMove(e)}></div>
        </div>
    )
}

export default EditMapComponent;