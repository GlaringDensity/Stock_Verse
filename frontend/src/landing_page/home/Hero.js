import React, { useState, useEffect } from "react";

function Hero() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = document.cookie.split("; ").find(row => row.startsWith("token="));
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleButtonClick = () => {
        if (isAuthenticated) {
            window.location.href = "http://localhost:3001"; // Redirect to dashboard
        } else {
            window.location.href = "/signup"; // Redirect to signup page
        }
    };

    return (
        <div className="container p-5 mb-5">
            <div className="row text-center">
                <img src="media/homehero.png" alt="heroimg" className="mb-5" />
                <h1 className="mt-5">Invest in everything</h1>
                <p>Online platform to invest in stocks, derivatives, and mutual funds</p>
                <button className="p-2 btn btn-primary" style={{ width: "20%", margin: "0 auto" }} onClick={handleButtonClick}>
                    {isAuthenticated ? "Go to Dashboard" : "Signup Now"}
                </button>
            </div>
        </div>
    );
}

export default Hero;
