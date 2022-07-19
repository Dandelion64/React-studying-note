import useWindowWidth from './hooks/useWindowWidth';
import useWindowHeight from './hooks/useWindowHeight';

import './MyResponsiveComponent.css';

function MyResponsiveComponent() {
    const width = useWindowWidth(); // Custom Hook
    const height = useWindowHeight(); // Custom Hook
    return (
        <div idName="MyResponsiveComponent">
            <p>Window width is {width}px</p>
            <p>Window width is {height}px</p>
        </div>
    );
}

export default MyResponsiveComponent;
