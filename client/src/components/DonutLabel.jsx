import React from 'react';

export default function GetDonutLabel({ averageGXS }){
    // Render averageGXS as a label
    return (
        <>{averageGXS !== null && <span></span>}</>
    );
}

