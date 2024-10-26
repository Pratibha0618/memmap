import React, { useState, useEffect } from 'react';

function MemoryForm({ location, initialData, onSubmit, onCancel }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const memoryData = {
            title,
            description,
            ...(location ? {
                latitude: location.lat,
                longitude: location.lng,
            } : {
                latitude: initialData.latitude,
                longitude: initialData.longitude,
            })
        };
        onSubmit(memoryData);
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Memory Title"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Memory Description"
                required
            />
            <div className="form-buttons">
                <button type="submit">{initialData ? 'Update' : 'Add'} Memory</button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="cancel-btn">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default MemoryForm;




