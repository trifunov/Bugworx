import React from 'react';
import { Link, Outlet, useMatches } from 'react-router-dom';

const ConfigurationLayout = () => {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">
                                    <Link to="/configuration">Configuration</Link>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default ConfigurationLayout;