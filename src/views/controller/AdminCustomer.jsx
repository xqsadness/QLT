import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { API_UPDATE_ROLE } from 'utils/const';
import { API_GET_USERS } from 'utils/const';
import Customer from 'views/customer/Customer';
import EditCustomer from 'views/customer/EditCustomer';

export default function AdminCustomer() {

  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [selected, setSelected] = useState(undefined)
  const [openEdit, setOpenEdit] = React.useState(false)
  const handleCloseEdit = () => setOpenEdit(false)
  useEffect(() => {
    fetchAPI()
  }, [])

  const handleChangePage = async (event, newPage) => {
    const response = await axios.get(API_GET_USERS + (newPage + 1) + "?sort=desc" + "&sortField=email" + "&usersPerPage=" + rowsPerPage)
    if (response) {
      setData(response.data.content)
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = async (event) => {
    const response = await axios.get(API_GET_USERS + 1 + "?sort=desc" + "&sortField=email" + "&usersPerPage=" + event.target.value)
    if (response) {
      setData(response.data.content)
      setPage(0);
      setRowsPerPage(+event.target.value);
    }
  };

  const fetchAPI = async () => {
    const response = await axios.get(API_GET_USERS + page + "?sort=desc" + "&sortField=email" + "&usersPerPage=" + rowsPerPage)
    if (response) {
      setData(response.data.content)
      setTotalPages(response.data.totalElements)
    }
  }
  console.log("data users", data);

  const onEdit = (item) => {
    setSelected(item)
    setOpenEdit(true)
    console.log(item);
  }

  const [id, setId] = useState(0)
  const [role, setRole] = useState('')

  const onSubmitEdit = async () => {
    const response = await axios.put(API_UPDATE_ROLE + id + "/update?roleName=" + role)
    if (response && response.status === 200) {
      toast.success("Sửa thành công", { autoClose: "1500" })
      fetchAPI();
    }
    setOpenEdit(false)

  }


  return (
    <div>
      <EditCustomer setId={setId} setRole={setRole} item={selected} openEdit={openEdit} handleCloseEdit={handleCloseEdit} onSubmitEdit={onSubmitEdit} />
      <Customer onEdit={onEdit} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} data={data} page={page} rowsPerPage={rowsPerPage} totalPages={totalPages} />
    </div>
  )
}
