import { Create } from '@mui/icons-material'
import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { API_PRODUCT_EDIT } from 'utils/const'
import { API_PRODUCT_DELETE } from 'utils/const'
import { API_PRODUCT_ADD } from 'utils/const'
import { API_GET_PILLAR } from 'utils/const'
import { API_GET_PRODUCT } from 'utils/const'
import CreatePillar from 'views/Pillar/CreatePillar,'
import EditPillar from 'views/Pillar/EditPillar'
import ListPillar from 'views/Pillar/ListPillar'

function AdminProduct() {
  const [data, setData] = useState([])
  const [dataAddress, setDataAddress] = useState([])
  const [selected, setSelected] = useState(undefined)
  const [open, setOpen] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    getAllProduct()
    getAddress()
  }, [])


  const getAddress = async (e) => {
    const response = await axios.get(API_GET_PILLAR)
    if (response) {
      setDataAddress(response.data.content)
    }
    console.log("data address", response.data);
  }


  const getAllProduct = async (e) => {
    const response = await axios.get(API_GET_PRODUCT)
    if (response) {
      setData(response.data)
    }
  }
  console.log('data,', data);


  const onEdit = async (item) => {
    setSelected(item)
    console.log("selected", item);
    setOpenEdit(true)
  }

  const onSubmit = async (data) => {
    const response = await axios.post(API_PRODUCT_ADD, data)
    if (response.status === 201) {
      toast.success("them thanh cong", { autoClose: "1500" })
      getAllProduct()
      setOpen(false)
    }

  }


  const onSubmitEdit = async (data) => {
    try {
      const response = await axios.put(API_PRODUCT_EDIT, data)
      if (response.status === 200) {
        toast.success("Sửa thành công", { autoClose: 1500 })
        getAllProduct()
        setOpenEdit(false)
      }

      //catch show error
    } catch (error) {
      console.log(error.response.data)
      if (error.response.data.message) {
        toast.error(`${error.response.data.message}`, {
          autoClose: 2000
        })
      }
      else if (error.response.data.error) {
        toast.error(`${error.response.data.error}`, {
          autoClose: 2000
        })
      }
      else if (error.response.data.error && error.response.data.message) {
        toast.error(`${error.response.data.message}`, {
          autoClose: 2000
        })
      }
      else {
        toast.error('Error', {
          autoClose: 2000
        })
      }
    }
  }

  const onDelete = async (id) => {
    const response = await axios.delete(API_PRODUCT_DELETE + id)
    if (response.status === 200) {
      toast.success("Xóa thành công", { autoClose: 1500 })
      getAllProduct()

    }
  }

  return (
    <div>
      <CreatePillar onSubmit={onSubmit} open={open} setOpen={setOpen} dataAddress={dataAddress} />
      {selected && <EditPillar item={selected} openEdit={openEdit} setOpenEdit={setOpenEdit} onSubmitEdit={onSubmitEdit} dataAddress={dataAddress} />}
      <ListPillar onDelete={onDelete} onEdit={onEdit} data={data} open={open} setOpen={setOpen} />
    </div>
  )
}

export default AdminProduct