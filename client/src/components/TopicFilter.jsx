import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import React, { useState, useEffect, useRef} from 'react';
import {Button, Checkbox} from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
// import { Filter } from 'tabler-icons-react';




const SelectTopics = ({handleFeaturesChange, selectedFeatures, features_list}) => {
    console.log("Features_list in SelectTopics:", features_list)    
    console.log("selectedFeatures in SelectTopics:", selectedFeatures)
    console.log("Type of handleFC in SelectTopics:", typeof handleFeaturesChange)
    
    return (
        <div>
            {features_list && features_list.map((feature)  => (
                <Checkbox
                    defaultChecked
                    key={feature}
                    label = {feature}
                    onClick={() => handleFeaturesChange(feature) }
                    color={selectedFeatures.includes(feature) ? 'white' : 'gray'} // Assuming you have selectedFeatures state to track selected features
                    variant="outline"
                    size="xs"
                    style={{ 
                        marginTop: '0px',
                        marginBottom: '0px',
                        marginRight: '3px',
                        marginLeft:'10px',
                        padding:'4px',
                        borderWidth: '2px',
                        fontSize: '10px',
                        color: 'white'
                    }}
                >
                   
                </Checkbox>
            ))}
        </div>     
    )

};


export default function TopicFilter({handleFeaturesChange, selectedFeatures, features_list}) {
    console.log("Type of features_list in SimgplePopup: ",typeof features_list)
    
    // Set state for opening and closing of popup
    const [anchor, setAnchor] = React.useState(null);

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popup' : undefined;

    //Handle escape of filter button
    // hide dropdown on ESC press
    const hideOnEscape = (e) => {
        // console.log(e.key)
        if( e.key === "Escape" ) {
            setAnchor(null)
        }
    }

    // Hide dropdown on outside click
    const hideOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target) ) {
            setAnchor(null);
        }
    };
    

    // get the target element to toggle 
    const refOne = useRef(null)

    useEffect(() => {
        // event listeners
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
        // event listener for mousedown
        document.addEventListener("mousedown", hideOnClickOutside);
        // cleanup
        return () => {
            document.removeEventListener("mousedown", hideOnClickOutside);
    };
    }, [])

    const icon = <IconFilter size={20} />;
    return (
        <div >
            <Button aria-describedby={id} type="button" onClick={handleClick} variant="outline" style={{ color:"white", border: 'none'}}>
                {/* Filter */}
                {icon}
            </Button>
            <div >
                <BasePopup id={id} open={open} anchor={anchor} ref={refOne}>
                    <PopupBody style={{backgroundColor: '#444557'}}>
                        <SelectTopics handleFeaturesChange={handleFeaturesChange} selectedFeatures={selectedFeatures} features_list = {features_list}/>
                    </PopupBody>
                </BasePopup>
            </div>
        </div>
    );
}

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const PopupBody = styled('div')(
    ({ theme }) => `
    // width: 500px;
    // height: 50px;
    padding: 10px 10px;
    margin: 4px;
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    box-shadow: ${
        theme.palette.mode === 'dark'
        ? `0px 4px 8px rgb(0 0 0 / 0.7)`
        : `0px 4px 8px rgb(0 0 0 / 0.1)`
    };
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    z-index: 1;
    `,
);

// const Button = styled('button')(
//     ({ theme }) => `
//     font-family: 'IBM Plex Sans', sans-serif;
//     font-weight: 600;
//     font-size: 0.875rem;
//     line-height: 1.5;
//     background-color: ${blue[500]};
//     padding: 8px 16px;
//     border-radius: 8px;
//     color: white;
//     transition: all 150ms ease;
//     cursor: pointer;
//     border: 1px solid ${blue[500]};
//     box-shadow: 0 2px 4px ${
//         theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 127, 255, 0.5)'
//     }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

//     &:hover {
//         background-color: ${blue[600]};
//     }

//     &:active {
//         background-color: ${blue[700]};
//         box-shadow: none;
//     }

//     &:focus-visible {
//         box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
//         outline: none;
//     }

//     &.disabled {
//         opacity: 0.4;
//         cursor: not-allowed;
//         box-shadow: none;
//         &:hover {
//         background-color: ${blue[500]};
//         }
//     }
//     `,
// );