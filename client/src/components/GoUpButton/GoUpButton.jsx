import { useEffect, useState } from "react";

export default function GoUpButton(){
    const [showUp, setShowUp] = useState("0");
    const [display, setDisplay] = useState("none")

  useEffect(() => {
    if(display!=="none"){
        window.onscroll = function () {
            let scroll = window.scrollY;
            if (scroll < 300) setShowUp("0");
            if (scroll >= 300) setShowUp("1");
        }
    }else{
        setTimeout(()=>setDisplay(""), 1000)
    }
  }, [display]);

  const goUp = () => {
    window.scroll(0, 0);
  }

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
        <button 
            style={{ disaplay: display, position: "fixed", right: 20, bottom: 20, transition: "0.5s", scale: showUp }}
            className={`px-3 py-2 border-0 ms-2 bg-dark text-white rounded mx-5}`}
            onClick={goUp}>
                <i className="fa-solid fa-angle-up"></i>
        </button>
  )
}