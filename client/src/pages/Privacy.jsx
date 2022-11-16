import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";
import Transition from "../components/Transition/Transition";
import { useEffect } from "react";
import GoUpButton from "../components/GoUpButton/GoUpButton";

export default function Privacy() {

    useEffect(()=>{
        window.scroll(0,0);
    }, []);

    return (
        <>
            <Nav />
            <Transition>
            <div class="container mt-4">
                <h2>Privacy Policies</h2><br /><br />
                <p>In order to use the website efficiently and safely, Users must provide certain information, including their name and surname, address, email, without which it would be impossible to provide the services. That is why it is required that these be true and accurate. The data collected by the corresponding forms will be incorporated into the general client base of TECNOSHOP S.A.<br /><br />
                    When data and numbers corresponding to credit cards are entered, they are encrypted, thus ensuring that they are kept completely confidential and cannot be seen by other people.<br /><br />
                    Users have the power to exercise the right of access, rectification, blocking or deletion of personal data that has been provided to the website personally or through a third party. It is clarified that these rights may only be exercised on information that may be considered personal data under the terms of Law No. 25,326.<br /><br />
                    To exercise any of these rights, the User must send an email to tecnoshop.henry@gmail.com detailing their name and surname, ID number, their request and reasons for exercising their right. Once the aforementioned extremes have been fulfilled and if it corresponds to make room for the request, TECNOSHOP S.A. will inform the User if he has proceeded to give rise to it or if he rejects the order. TECNOSHOP S.A. You will have 10 business days from receipt of the request to send a response in the case of an access request, and 5 business days if the User requests the rectification, updating or deletion of their data.<br /><br />
                    Likewise, Users may request at any time the removal of their request and the removal of their account from the database, by sending an email to tecnoshop.henry@gmail.com requesting removal from the database or request.<br /><br />
                    By registering on the website and forming part of the general customer base, Users accept that TECNOSHOP S.A. communicate with them by post, telephone or electronically to send information that the company considers, in its sole discretion, may be of interest to you, including advertising and information about offers and promotions. In the event that Users do not wish to be contacted for these purposes, they may reliably express this to TECNOSHOP S.A., who will proceed to interrupt this type of communication in the shortest possible time.<br /><br />
                    The owner of the personal data has the power to exercise the right of access to them free of charge at intervals of no less than six months, unless a legitimate interest is proven for this purpose in accordance with the provisions of article 14, paragraph 3 of Law No. 25,326. The National Directorate for the Protection of Personal Data, the control body of Law No. 25,326, has the power to deal with complaints and claims filed in relation to non-compliance with the regulations on the protection of personal data.<br /><br />
                    The personal information that Users enter on the website will be treated confidentially and TECNOSHOP S.A. will do its best to protect their privacy, in accordance with the provisions of Law 25,326. Notwithstanding the foregoing, the User must bear in mind that the Internet is not an impregnable medium in terms of its security.
                    </p>
            </div>
            <GoUpButton />
            </Transition>
            <Footer />
        </>
    );
}