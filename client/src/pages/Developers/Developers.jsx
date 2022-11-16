import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import { Card } from "react-bootstrap";
import Ana from "./Imagenes/Ana.jpeg";
import Nahuel from "./Imagenes/Nahuel.jpeg";
import Damian from "./Imagenes/Damian.jpeg";
import Estefano from "./Imagenes/Estefano.jpeg";
import Anderson from "./Imagenes/Anderson.jpeg";
import Enrique from "./Imagenes/Enrique.jpeg"
import Juan from "./Imagenes/Juan.jpeg"
import Transition from "../../components/Transition/Transition";
import { useEffect } from "react";
import GoUpButton from "../../components/GoUpButton/GoUpButton";

export default function Developers() {

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    let info = [
        { name: "Ana Belén Gonzalvez", email: "mailto:anaa.gonzalvez2@gmail.com", gitHub: "https://github.com/AnaGonzalvez", linkedIn: "https://linkedin.com/in/anabeléngonzalvez", img: Ana },
        { name: "Damian Gonzalez", email: "mailto:damiangonzalez@gmail.com", gitHub: "https://github.com/nangonz", linkedIn: "https://www.linkedin.com/in/dami-gonzalez/", img: Damian },
        { name: "Anderson Marin", email: "mailto:andersonmarindev@gmail.com", gitHub: "https://github.com/anmarinur", linkedIn: "https://www.linkedin.com/in/andersonmarindev/", img: Anderson },
        { name: "Estefano Muller", email: "mailto:stefano.muller@hotmail.com", gitHub: "https://github.com/emuller1996", linkedIn: "https://www.linkedin.com/in/estefano-m%C3%BCller-3a9b8b237/", img: Estefano },
        { name: "Nahuel Puig", email: "mailto:puignahuel.ventas@gmail.com", gitHub: "https://github.com/nahuel3223", linkedIn: "https://www.linkedin.com/in/nahuel-lautaro-puig-172a94181", img: Nahuel },
        { name: " Enrique Lopez Flores", email: "mailto:enriqueflores@gmail.com", gitHub: "https://github.com/ingenriquelopez", linkedIn: "https://www.linkedin.com/in/enrique-lopez-flores-461322254/", img: Enrique },
        { name: "Juan Ignacio Grodz", email: "mailto:jigrodz@gmail.com", gitHub: "https://github.com/Juani2409", linkedIn: "https://www.linkedin.com/in/juan-ignacio-grodz-80ab57241/", img: Juan }
    ]

    return (
        <div>
            <Nav />
            <Transition>
                <GoUpButton />
                <div class="container d-flex flex-column justify-content-center align-items-center">
                    <h2 className="fw-bold text-danger text-center my-2 fs-1">Developers</h2>

                    <div class="row  g-2 mb-4 " >

                        {info.map((e) =>
                            <div className="col-md-6  ">
                                <Card className="w-100 h-100 mt-4 shadow ">
                                    <div class="row g-0 align-items-center" >

                                        <div class="col-12 align-middle text-center col-md-3" >
                                            <Card.Img
                                                style={{

                                                    maxWidth: "10em",
                                                    maxHeight: "15em",
                                                    marginTop: "3em",
                                                    marginBottom: "3em",
                                                    borderRadius: "10px",
                                                    marginLeft: "2em",

                                                }}
                                                src={e.img}
                                            />
                                        </div>
                                        <div class=" col-12 text-center col-md-8 p-5"   >
                                            <Card.Subtitle className=" fs-5 "
                                                style={{

                                                }}  >

                                                <b> {e.name} </b> <br /><br />
                                                Full Stack-Developer <br /><br />
                                                <div class="row g-0" >
                                                    <div class=" col-12">
                                                        <a href={e.gitHub} className="px-2 text-white" target="_blank">
                                                            <i class="fa-brands fa-github fa-3x text-black"></i></a>
                                                        <a href={e.email}>
                                                            <i class="fa-solid fa-envelope fa-3x text-info"></i></a>
                                                        <a href={e.linkedIn} className=" px-2 " target="_blank">
                                                            <i class="fa-brands fa-linkedin fa-3x text-primary"></i>
                                                        </a>

                                                    </div>
                                                </div>
                                            </Card.Subtitle>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </Transition>
            <Footer />
        </div>

    );
}