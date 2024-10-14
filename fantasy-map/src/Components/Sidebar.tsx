type SidebarProps = {
    url:string
}

function Sidebar({url}:SidebarProps){
    return(
        <div className={"sidebar-container"}>
            {/*<iframe src={url}/>*/}
            <p>{url}</p>
        </div>
    )
}

export default Sidebar;