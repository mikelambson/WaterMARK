interface DragIconProps {
    className?: string;
}

const DragIcon: React.FC<DragIconProps> = ({className}) => {
    return ( 
        <div className={`flex items-center align-middle justify-center ${className}`}>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="-1 4 10 32" 
                fill="currentColor" 
                className="bi bi-grip-vertical" 
                width="16px" 
                height="100%">
                <rect width=".75" height="38" rx="1" />
                <rect x="2" width=".75" height="38" rx="1" />
                <rect   x="4" width=".75" height="38" rx="1" />
                <rect   x="6" width=".75" height="38" rx="1" />
            </svg>
        </div>
     );
}
 
export default DragIcon;