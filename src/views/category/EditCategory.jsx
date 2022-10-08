import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function EditCategory({ openEdit, setOpenEdit, item, onSubmitEdit }) {
    const { name, description } = item;
    const [data, setData] = useState(item || {
        name: item.name || "",
        description: item.description || ""
    })
    const onChangeText = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleClose = () => setOpenEdit(false)

    console.log(data);
    return (
        <div>
            <Modal
                open={openEdit}
                onClose={setOpenEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='form-add-product'
                    sx={{
                        maxWidth: '40%',
                        margin: '0 auto',
                        marginTop: ' 150px',
                        backgroundColor: 'white',
                        padding: '10px'
                    }}
                >
                    <h2 style={{ textAlign: 'center' }}>Thêm danh mục</h2>
                    <div style={{ display: 'flex', flexDirection: "column-reverse", margin: "10px" }} className="form-flex">
                        <TextField onChange={onChangeText} defaultValue={name} name="description" style={{ margin: '5px' }} fullWidth label='Chú thích' />
                        <TextField onChange={onChangeText} defaultValue={description} name="name" style={{ margin: '5px' }} fullWidth label='Tên danh mục' />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={handleClose} sx={{ marginRight: "5px" }} variant="contained" color="success">
                            Đóng
                        </Button>
                        <Button onClick={() => onSubmitEdit(data)} variant="contained" color="success">
                            Sửa
                        </Button>
                    </div>

                </Box>

            </Modal>
        </div>
    )
}