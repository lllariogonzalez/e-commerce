export default function Loading({size, text, height}){
    const textShow = text || false
    const sizeLoad = size || "100px"
    const heigthDiv = height || "100px"
    return (
        <div style={{height: heigthDiv, width: "100%", fontSize: "1rem"}} className="d-flex justify-content-center align-items-center">
            <div>
            <div style={{fontSize:"1rem"}} className="d-flex justify-content-center fw-bold">
                {textShow && "LOADING" }
            </div>
            <div className="d-flex justify-content-center align-items-center loader" style={{rotate: "180deg"}}>
                <svg width={sizeLoad} height={sizeLoad} viewBox={"-4 -1 38 28"} >
                    <polygon fill="transparent" stroke="#A52323" strokeWidth={"3"} points={"15, 0 30, 30 0, 30"}  ></polygon>
                </svg>
            </div>
            </div>
        </div>
    )
}