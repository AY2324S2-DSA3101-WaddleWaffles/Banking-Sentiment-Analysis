import React from 'react';

export default function GetDonutLabel({ averageGXS }){
    // No need for useEffect here

    // Render averageGXS as a label
    return (
        <>{averageGXS !== null && <span>Average GXS Rating: {averageGXS}</span>}</>
    );
}
