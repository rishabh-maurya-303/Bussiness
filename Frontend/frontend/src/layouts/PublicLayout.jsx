import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pb-[76px] md:pb-0">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default PublicLayout;