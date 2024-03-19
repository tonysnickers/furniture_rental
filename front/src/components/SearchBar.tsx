import { Box, Button, TextField } from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Divider from '@mui/material/Divider';
import { useState } from "react";
import { Search } from "@mui/icons-material";


export const SearchBar = () => {
    const [searchValue, setSearchValue] = useState<string>('');

    return (
        <Box sx={{border: '1px solid #A2A2A2', borderRadius: 9, width: 500,  color: '#000', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <TextField
                autoComplete="off"
                variant="outlined"
                sx={{ 
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'transparent', 
                        },
                        '&:hover fieldset': {
                            borderColor: 'transparent', 
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'transparent',
                        },
                    },
                }}
                size="small"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={'Ville de location'}
            />
            <Divider orientation="vertical" variant="middle" flexItem />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    sx={{ 
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'transparent', 
                            },
                            '&:hover fieldset': {
                                borderColor: 'transparent', 
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'transparent',
                            },
                        },
                    }}
                />
                <Divider orientation="vertical" variant="middle" flexItem />
                <DatePicker 
                    sx={{ 
                        width: '100%',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'transparent', 
                                },
                                '&:hover fieldset': {
                                    borderColor: 'transparent', 
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'transparent',
                                },
                            },
                    }}
                />
            </LocalizationProvider>
            <Button
                variant="text"
                sx={{
                    borderRadius: '100%',
                    border: '1px solid',
                    backgroundColor: '#000', 
                    alignItems: 'center', 
                    justifyContent: 'center',  
                    minHeight: 50,
                    minWidth: 50,
                    mr: '4px',
                    ml: '9px',
                    color: '#fff',
                    
                    '&:hover': {
                        background: '#000'
                    }
                }}
            >
                <Search sx={{ color: '#fff' }} />
            </Button>
        </Box>
    )
}