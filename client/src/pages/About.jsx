import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";
import Transition from "../components/Transition/Transition";
import { useEffect } from "react";
import GoUpButton from "../components/GoUpButton/GoUpButton";

export default function Home(){

    useEffect(()=>{
        window.scroll(0,0);
    }, []);

    return (
        <>
            <Nav />
            <Transition>
            <div style={{minHeight: "65vh"}} class="container mt-4">
                <h2>About Tecnoshop</h2>
                <p>
                    We are a technology store in Latin America. We are dedicated to the sale of laptops, smartphones, tablets, smartwatches, speakers and tv's for private consumers, companies or resellers.</p>
                <p>Brands like Samsung, Apple, HP, Microsoft, Lenovo and Huawei have made us their official representatives in this part of the world.</p>
                <p>At Tecnoshop we know our products and therefore we advise you to make a personalized purchase that meets your needs.</p>
                <p>Our public:<br/>
                    -Particular: we specialize in high-end products. In the same way, we have teams to cover any need or requirement.<br/>
                    -Corporate: we provide solutions tailored to each company. High quality products, immediate attention and support.<br/>
                    -Resellers: we want you to grow with us, for this we have special discounts with your benefit in mind.</p>
                <h2>Our mission and our approach</h2>
                <p>Tecnoshop follows a simple business philosophy: to dedicate its talent and technology to selling superior products that contribute to a better global society. To achieve this, it places a high value on its people and technologies.</p>
            </div> 
            <GoUpButton />
            </Transition>      
            <Footer />
        </>
    );
}