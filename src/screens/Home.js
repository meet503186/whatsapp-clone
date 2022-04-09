import React from 'react';
import Sidebar from '../components/Sidebar';

function Home(props) {

    document.title = "WhatsApp 2.0"

    return (
        <div>
            <Sidebar />
        </div>
    );
}

export default Home;