// src/components/Timeline.js
/*import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Divider,
    Card,
    CardContent,
    CardMedia,
    IconButton
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Place as PlaceIcon
} from '@mui/icons-material';
import './Timeline.css';

const Timeline = ({ memories, onEditMemory, onDeleteMemory }) => {
    // Sort memories by date
    const sortedMemories = [...memories].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Group memories by year and month
    const groupedMemories = sortedMemories.reduce((groups, memory) => {
        const date = new Date(memory.createdAt);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });

        if (!groups[year]) {
            groups[year] = {};
        }
        if (!groups[year][month]) {
            groups[year][month] = [];
        }
        groups[year][month].push(memory);
        return groups;
    }, {});

    return (
        <Box sx={{
            maxWidth: 800,
            margin: '20px auto',
            padding: '20px',
            overflowY: 'auto',
            height: 'calc(100vh - 100px)'
        }}>
            <Typography variant="h4" gutterBottom align="center">
                Your Memory Timeline
            </Typography>

            {Object.entries(groupedMemories).reverse().map(([year, months]) => (
                <Box key={year} sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        mb: 2
                    }}>
                        {year}
                    </Typography>

                    {Object.entries(months).reverse().map(([month, monthMemories]) => (
                        <Box key={`${year}-${month}`} sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2, color: '#666' }}>
                                {month}
                            </Typography>

                            {monthMemories.map((memory) => (
                                <Card key={memory.id} sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <Box>
                                                <Typography variant="h6">
                                                    {memory.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                    <PlaceIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                                                    {memory.location}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {memory.description}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onEditMemory(memory.id)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onDeleteMemory(memory.id)}
                                                    color="error"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>

                                        {memory.image && (
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={memory.image}
                                                alt={memory.title}
                                                sx={{
                                                    mt: 2,
                                                    borderRadius: '4px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        )}

                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                            {new Date(memory.createdAt).toLocaleString()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    ))}
                </Box>
            ))}

            {sortedMemories.length === 0 && (
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                        No memories added yet. Start creating your journey!
                    </Typography>
                </Paper>
            )}
        </Box>
    );
};

export default Timeline;
*/


import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Dialog
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Place as PlaceIcon
} from '@mui/icons-material';
import './Timeline.css';
import ViewToggle from './ViewToggle';
import MemoryForm from './MemoryForm';

const Timeline = ({ memories, onEditMemory, onDeleteMemory }) => {
    const [editingMemory, setEditingMemory] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Sort memories by date
    const sortedMemories = [...memories].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Group memories by year and month
    const groupedMemories = sortedMemories.reduce((groups, memory) => {
        const date = new Date(memory.createdAt);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });

        if (!groups[year]) {
            groups[year] = {};
        }
        if (!groups[year][month]) {
            groups[year][month] = [];
        }
        groups[year][month].push(memory);
        return groups;
    }, {});

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this memory?')) {
            onDeleteMemory(id);
        }
    };

    const handleEdit = (memory) => {
        setEditingMemory(memory);
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (updatedMemory) => {
        onEditMemory(editingMemory.id, updatedMemory);
        setIsEditModalOpen(false);
        setEditingMemory(null);
    };

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
        setEditingMemory(null);
    };

    return (
        <Box sx={{ position: 'relative' }}>
            <ViewToggle />
            <Box sx={{
                maxWidth: 800,
                margin: '20px auto',
                padding: '20px',
                overflowY: 'auto',
                height: 'calc(100vh - 100px)'
            }}>
                <Typography variant="h4" gutterBottom align="center">
                    Your Memory Timeline
                </Typography>

                {Object.entries(groupedMemories).reverse().map(([year, months]) => (
                    <Box key={year} sx={{ mb: 4 }}>
                        <Typography variant="h5" sx={{
                            backgroundColor: '#1976d2',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            mb: 2
                        }}>
                            {year}
                        </Typography>

                        {Object.entries(months).reverse().map(([month, monthMemories]) => (
                            <Box key={`${year}-${month}`} sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ mb: 2, color: '#666' }}>
                                    {month}
                                </Typography>

                                {monthMemories.map((memory) => (
                                    <Card key={memory.id} sx={{ mb: 2 }}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="h6">
                                                        {memory.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                        <PlaceIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                                                        {memory.location}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {memory.description}
                                                    </Typography>
                                                </Box>
                                                <Box>

                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleDelete(memory.id)}
                                                        color="error"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>

                                            {memory.image && (
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={memory.image}
                                                    alt={memory.title}
                                                    sx={{
                                                        mt: 2,
                                                        borderRadius: '4px',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            )}

                                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                                {new Date(memory.createdAt).toLocaleString()}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        ))}
                    </Box>
                ))}

                {sortedMemories.length === 0 && (
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="body1" color="text.secondary">
                            No memories added yet. Start creating your journey!
                        </Typography>
                    </Paper>
                )}
            </Box>

            {/* Edit Memory Modal */}
            <Dialog
                open={isEditModalOpen}
                onClose={handleEditCancel}
                maxWidth="md"
                fullWidth
            >
                {editingMemory && (
                    <MemoryForm
                        initialData={editingMemory}
                        onSubmit={handleEditSubmit}
                        onCancel={handleEditCancel}
                        isEditing={true}
                    />
                )}
            </Dialog>
        </Box>
    );
};

export default Timeline;
