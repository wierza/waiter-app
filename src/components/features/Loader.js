import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <div>
            <Spinner animation="border" role="status" variant="primary" className="loader" />
        </div>
    );
};

export default Loader;