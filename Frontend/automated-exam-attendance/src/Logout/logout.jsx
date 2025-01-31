import React, { useEffect } from 'react';


const Logout = () => {


    useEffect(() => {
        // Remove user_id from session storage
        sessionStorage.removeItem('user_id');
        

    });

    return null;
};

export default Logout;