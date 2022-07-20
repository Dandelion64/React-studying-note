import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

function SimplebarTest() {
    return (
        <SimpleBar style={{ maxHeight: 300 }}>
            {Array(100)
                .fill(1)
                .map((v, i) => (
                    <p key={i}>{i + 1}</p>
                ))}
        </SimpleBar>
    );
}

export default SimplebarTest;
