import React from 'react';
import Image from 'next/image';
import XoneHorizontalLogo from '../../../public/xone-logo.svg';

const XoneLogo = ({ className, width, height }) => {
    return (
        <Image
            src={XoneHorizontalLogo}
            width={width}
            height={height}
            alt="Xone"
            className={className}
        />
    );
};

export default XoneLogo;
