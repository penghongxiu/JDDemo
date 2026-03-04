import React, {useState, useEffect} from "react";
import BookCard from "./module/BookCard";
import "./index.scss";


const App: React.FC = () => {
    useEffect(() => {

    }, [])

    return (
        <div className="index-wrap">
           <BookCard />
        </div>
    );
}

export default App;
