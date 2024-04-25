import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import React, { useEffect, useRef} from 'react';
import {Button, Checkbox} from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';

const SelectTopicsPR = ({handleFeaturesChangePR, selectedFeaturesPR, features_listPR}) => {
    return (
        <div>
            {features_listPR && features_listPR.map((featurePR)  => (
                <Checkbox
                    defaultChecked
                    key={featurePR}
                    label = {featurePR}
                    onClick={() => handleFeaturesChangePR(featurePR) }
                    color={selectedFeaturesPR.includes(featurePR) ? 'white' : 'gray'} // Assuming you have selectedFeatures state to track selected features
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

export default function TopicFilterPR({handleFeaturesChangePR, selectedFeaturesPR, features_listPR}) {
    // Set state for opening and closing of popup
    const [anchor, setAnchor] = React.useState(null);
    const open = Boolean(anchor);
    const id = open ? 'simple-popup' : undefined;
    const refOne = useRef(null);
    const icon = <IconFilter size={25} />;

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    // Hide dropdown on ESC press
    const hideOnEscape = (e) => {
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

    useEffect(() => {
        // Event listeners
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
        // Event listener for mousedown
        document.addEventListener("mousedown", hideOnClickOutside);
        return () => {
            document.removeEventListener("mousedown", hideOnClickOutside);
        };
    }, [])


    return (
        <div style={{marginLeft: '10px'}}>
            <Button aria-describedby={id} type="button" onClick={handleClick} variant="outline" style={{ color:"white", border: 'none', padding: '1px'}}>
                {icon}
            </Button>
            <div >
                <BasePopup id={id} open={open} anchor={anchor} ref={refOne}>
                    <PopupBodyPR style={{backgroundColor: '#444557'}}>
                        <SelectTopicsPR handleFeaturesChangePR={handleFeaturesChangePR} selectedFeaturesPR={selectedFeaturesPR} features_listPR = {features_listPR}/>
                    </PopupBodyPR>
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

const PopupBodyPR = styled('div')(
    ({ theme }) => `
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
    font-weight: 500;
    font-size: 0.875rem;
    z-index: 1;
    `,
);
