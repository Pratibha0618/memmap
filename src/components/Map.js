import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MemoryForm from './MemoryForm';
import './MapStyles.css';


import { Button } from '@mui/material';
import { Timeline as TimelineIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


import ShareIcon from '@mui/icons-material/Share';
import ShareDialog from './ShareDialog';


const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/484/484167.png",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
});

function CustomMarker({ memory, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleUpdate = (updatedMemory) => {
        onEdit(memory.id, updatedMemory);
        setIsEditing(false);
    };

    return (
        <Marker
            position={[memory.latitude, memory.longitude]}
            icon={customIcon}
        >
            <Popup className="custom-popup">
                {isEditing ? (
                    <div className="memory-form">
                        <MemoryForm
                            initialData={memory}
                            onSubmit={handleUpdate}
                            onCancel={() => setIsEditing(false)}
                        />
                    </div>
                ) : (
                    <div>
                        <div className="memory-thumbnail" style={{ backgroundImage: `url(https://source.unsplash.com/random/200x200?sig=${memory.id})` }}>
                            <div className="memory-info">
                                <h3>{memory.title}</h3>
                                <p>{memory.description}</p>
                            </div>
                        </div>
                        <div className="memory-actions">
                            <button onClick={handleEdit} className="edit-btn">Edit</button>
                            <button onClick={() => onDelete(memory.id)} className="delete-btn">Delete</button>
                        </div>
                    </div>
                )}
            </Popup>
        </Marker>
    );
}

function MapComponent({ memories, onAddMemory, onEditMemory, onDeleteMemory }) {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
    const [selectedMemoryForShare, setSelectedMemoryForShare] = useState(null);


    function MapEvents() {
        useMapEvents({
            click(e) {
                setSelectedLocation(e.latlng);
            },
        });
        return null;
    }

    return (
        <>
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapEvents />
                {memories.map((memory) => (
                    <CustomMarker
                        key={memory.id}
                        memory={memory}
                        onEdit={onEditMemory}
                        onDelete={onDeleteMemory}
                    />
                ))}
                {selectedLocation && (
                    <Marker position={selectedLocation} icon={customIcon}>
                        <Popup className="custom-popup">
                            <div className="memory-form">
                                <MemoryForm
                                    location={selectedLocation}
                                    onSubmit={(memory) => {
                                        onAddMemory(memory);
                                        setSelectedLocation(null);
                                    }}
                                    onCancel={() => setSelectedLocation(null)}
                                />
                            </div>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>


            <Button
                variant="contained"
                startIcon={<ShareIcon />}
                onClick={() => setIsShareDialogOpen(true)}
                sx={{
                    position: 'absolute',
                    top: '10px',
                    right: '360px',
                    zIndex: 1000
                }}
            >
                Share
            </Button>

            <ShareDialog
                open={isShareDialogOpen}
                onClose={() => {
                    setIsShareDialogOpen(false);
                    setSelectedMemoryForShare(null);
                }}
                memories={memories}
                selectedMemory={selectedMemoryForShare}
            />

        </>
    );
}



function ViewToggleButton() {
    const navigate = useNavigate();

    return (
        <Button
            variant="contained"
            startIcon={<TimelineIcon />}
            onClick={() => navigate('/timeline')}
            style={{
                position: 'absolute',
                top: '10px',
                right: '120px', // Adjust based on your layout
                zIndex: 1000,
            }}
        >
            Timeline View

        </Button>
    );
}

export default MapComponent;
