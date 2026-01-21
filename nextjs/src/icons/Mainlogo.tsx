const Mainlogo = ({ height, width, className }: any) => {
    return (
        <svg
            width={width}
            height={height}
            className={className}
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <text
                x="50%"
                y="50%"
                fontFamily="Arial"
                fontSize="45"
                fill="url(#mainlogo_gradient)"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
            >
                Z
            </text>
            <defs>
                <linearGradient id="mainlogo_gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff7f50" stopOpacity="1" />
                    <stop offset="100%" stopColor="#6637EC" stopOpacity="1" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default Mainlogo;
