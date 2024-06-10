import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Fab from '@mui/material/Fab';
import styled from 'styled-components';

const StyledButtonUp = styled(Fab)`
  position: fixed !important;
  bottom: 5% !important;
  right: 20px !important;
  background: #000000e3 !important;
  cursor: pointer !important;
  transition: opacity 0.3s ease !important;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')} !important;
`;

export default function GoToTop({ classFollowing }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            const tableContainer = document.querySelector('.' + classFollowing);
            if (tableContainer.scrollTop > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        const tableContainer = document.querySelector('.' + classFollowing);
        tableContainer.addEventListener('scroll', toggleVisibility);

        return () => {
            tableContainer.removeEventListener('scroll', toggleVisibility);
        };
    }, [classFollowing]);

    const scrollToTop = () => {
        const tableContainer = document.querySelector('.' + classFollowing);
        tableContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <StyledButtonUp name='go-to-top' size="small" isVisible={isVisible} onClick={scrollToTop}>
            <FontAwesomeIcon icon={faArrowUp} size="xl" style={{ color: '#fff' }} />
        </StyledButtonUp>
    );
};
