import React from 'react';

//React allows us to produce a globally available property
// where we can specify where it is available.
const authContext = React.createContext({
    authenticated: false,
     login: () => {}
    });

export default authContext;