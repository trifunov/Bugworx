import React, { useEffect } from 'react';

/**
 * Drawing modal component
 * Props:
 *  - drawing: { drawingId, drawingName, drawingUrl }
 *  - show: boolean - whether modal is visible
 *  - onClose: function - callback to close the modal
 */
const Drawing = (
    props
) => {
    const { drawing, show, onClose } = props;

    return (
        <>
            {show &&
                (<div
                    className={`modal fade ${show ? 'show' : ''}`}
                    tabIndex="-1"
                    role="dialog"
                    style={{ display: show ? 'block' : 'none' }}
                    aria-modal={show}
                >
                    <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{drawing.name || drawing.id}</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                            </div>
                            <div className="modal-body">
                                {drawing.url ? (
                                    // Prefer showing an image; if it's not an image, the browser will attempt to render it (e.g., PDF may open in-browser)
                                    <div className="text-center">
                                        <img
                                            src={drawing.url}
                                            alt={drawing.name || drawing.id}
                                            className="img-fluid"
                                            style={{ maxHeight: '75vh' }}
                                        />
                                    </div>
                                ) : (
                                    <p className="text-muted">No drawing URL provided.</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>)
            }

            {show && <div className="modal-backdrop fade show" onClick={onClose} />}
        </>
    );
};

export default Drawing;