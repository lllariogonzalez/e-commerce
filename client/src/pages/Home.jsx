import CardProductsList from "../components/CardProductList/CardProductsList";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";

export default function Home(){
    return (
      <>
        <Nav />
        <CardProductsList />
        <Footer />
      </>
    );
}