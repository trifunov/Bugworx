import React from 'react';
import { Outlet } from 'react-router-dom';

const ConfigurationLayout = () => {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <div className="page-title-right">
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default ConfigurationLayout;