import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddPictures({ open, setOpen, onSubmitAdd }) {
    const [data, setData] = useState({
        category: "",
        image: ""
    })
    const [selectedImage, setSelectedImage] = useState(null);

    const onChangeText = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onClickAdd = () => {
        onSubmitAdd(data)
    }


    const onChangeImage = (event) => {
        const value = event.target.files[0]
        setSelectedImage(event.target.files[0])
        setData({ ...data, image: event.target.files[0] })
    }

    const handleClose = () => setOpen(false)
    console.log(data);
    return (
        <div>
            <Modal
                open={open}
                onClose={setOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='form-add-product'
                    sx={{
                        maxWidth: '40%',
                        margin: '0 auto',
                        marginTop: ' 200px',
                        backgroundColor: 'white',
                        padding: '10px'
                    }}
                >
                    <h2 style={{ textAlign: 'center' }}>Thêm ảnh</h2>
                    <div style={{ display: 'flex', flexDirection: "column", margin: "10px" }} className="form-flex">
                        <TextField onChange={onChangeText} defaultValue='' name="category" style={{ margin: '5px' }} fullWidth label='Loại ảnh' />
                        <TextField onChange={onChangeImage} style={{ margin: '5px -5px 5px 5px' }}
                            name="image" type="file" multiple accept="image/*" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={handleClose} sx={{ marginRight: "5px" }} variant="contained" color="success">
                            Đóng
                        </Button>
                        <Button onClick={onClickAdd} variant="contained" color="success">
                            Thêm
                        </Button>
                    </div>

                </Box>

            </Modal>
        </div>
    )
}