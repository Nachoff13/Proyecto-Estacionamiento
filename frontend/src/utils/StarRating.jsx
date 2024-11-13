import React from 'react';
import { SvgIcon } from '@mui/material';

const Star = (props) => (
    <SvgIcon {...props}>
        <path d="M12 17.27L18.18 21 16.54 14.97 22 10.24 15.81 9.63 12 3 8.19 9.63 2 10.24 7.46 14.97 5.82 21z" />
    </SvgIcon>
);

const StarRating = ({ rating, onRatingChange }) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} onClick={() => onRatingChange(i)} style={{ cursor: 'pointer' }}>
                <Star sx={{ color: i <= rating ? '#FFD700' : '#E0E0E0' }} />
            </span>
        );
    }
    
    return <div>{stars}</div>;
};

export default StarRating;