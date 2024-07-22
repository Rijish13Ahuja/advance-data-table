import React from 'react';
import { Drawer, Typography, List, ListItem, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

const SortingSidebar = ({ isOpen, onClose, columns = [], sorting, setSorting }) => {
    const handleSortingChange = (columnId) => {
        const existingSortIndex = sorting.findIndex(sort => sort.id === columnId);
        if (existingSortIndex > -1) {
            const newSorting = [...sorting];
            if (newSorting[existingSortIndex].desc) {
                newSorting.splice(existingSortIndex, 1);
            } else {
                newSorting[existingSortIndex] = { id: columnId, desc: true };
            }
            setSorting(newSorting);
        } else {
            setSorting([...sorting, { id: columnId, desc: false }]);
        }
    };

    const getSortIcon = (columnId) => {
        const sort = sorting.find(s => s.id === columnId);
        if (!sort) return <SwapVertIcon sx={{ color: '#a9a9a9' }} />;
        return sort.desc ? <SouthIcon sx={{ fontSize: 18, color: '#a9a9a9' }} /> : <NorthIcon sx={{ fontSize: 18, color: '#a9a9a9' }} />;
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <div style={{ width: 400, padding: 40 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 'bold', color: '#555555' }}>Sorting Options</Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon sx={{ fontSize: 30, color: '#333333' }} />
                    </IconButton>
                </div>
                <List>
                    {columns.length > 0 ? (
                        columns.map((column) => (
                            <ListItem 
                                key={column.accessorKey || column.id} 
                                button 
                                onClick={() => handleSortingChange(column.accessorKey || column.id)} 
                                sx={{ border: '1px solid lightgrey', borderRadius: 5, padding: '10px', marginBottom: 2, display: 'flex', alignItems: 'center' }}
                            >
                                <Typography sx={{ color: '#333333', marginRight: 2 }}>{column.header}</Typography>
                                {getSortIcon(column.accessorKey || column.id)}
                            </ListItem>
                        ))
                    ) : (
                        <Typography sx={{ color: '#a9a9a9', textAlign: 'center' }}>No columns available</Typography>
                    )}
                </List>
                <Button 
                    fullWidth 
                    variant="outlined" 
                    onClick={() => setSorting([])} 
                    sx={{ fontSize: 16, marginTop: 2, padding: '10px', border: '2px solid lightblue', color: '#444444', textTransform: 'none' }}
                >
                    Clear Sort
                </Button>
            </div>
        </Drawer>
    );
};

export default SortingSidebar;
