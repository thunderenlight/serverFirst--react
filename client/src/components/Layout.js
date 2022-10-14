import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./Header";
import AuthBox from "./AuthBox";


const Layout = () => {
    return(
        <BrowserRouter>
            <Header />

            <Routes>
                <Route exact path="/" element={<AuthBox />} />
                <Route  path="/test" element={<h3>test</h3>} />
                <Route  path="/register" element={<AuthBox register/>} />

            </Routes>
        </BrowserRouter>
    )
};

export default Layout