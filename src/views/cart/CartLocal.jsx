import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_PLACE_ORDER } from 'utils/const'
import { API_CART_REMOVE } from 'utils/const'
import { API_GET_CART } from 'utils/const'
import './cart.css'
import jwt_decode from "jwt-decode";
import { formatMoney } from './../../common/formatMoney';

function CartLocal() {

    if (localStorage.getItem('cartTemp') == undefined || null) {
        localStorage.setItem('cartTemp', JSON.stringify([]))
    }

    if (localStorage.getItem('cartADD') == undefined || null) {
        localStorage.setItem('cartADD', JSON.stringify([]))
    }

    const [dataLocal, setDataLocal] = useState(JSON.parse(localStorage.getItem('cartTemp')))


    const [month, setMonth] = useState(1)
    // const [btnOrders, setBtnOrders] = useState('Đặt hàng')
    const [btnDisabled, setBtnDisabled] = useState(false)
    const history = useHistory()
    let decoded;
    let token = localStorage.getItem("token");
    if (token !== null) {
        decoded = jwt_decode(token);
    }


    console.log('data loacl ', dataLocal);
    const handleUpdateMonth = () => {
        setMonth(month + 1)
    }

    const handleMonth = () => {
        if (month > 1) {
            setMonth(month - 1)
        }
    }

    // const [idOrder, setIdOrder] = useState()
    const clickOrder = async () => {
        // setBtnOrders('Vui lòng chờ...')
        // setBtnDisabled(true)
        try {
            if (token) {
                const response = await axios.post(API_PLACE_ORDER, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                if (response && response.status === 200) {
                    console.log("iddddd ", response.data.message);
                    toast.success('Success', {
                        autoClose: 3000
                    })
                    setTimeout(() => {
                        history.push('/auth/order/' + response.data.message.replace(/\D/g, ""))
                    }, 2000);
                    setBtnDisabled(true);
                };
                // setBtnOrders('Vui lòng chờ...')
            } else {
                toast.success('Please login', {
                    autoClose: 3000
                })
                history.push('/auth/login')
            }
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
    let sum = 0
    dataLocal.map((item) => {
        sum += (Number(item.priceProduct) * Number(item.day))
    })

    useEffect(() => {

    }, [])

    const onClickRemoveItemCart = async (id) => {
        console.log('id cart', id);
        const response = await axios.put(API_CART_REMOVE + id, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            toast.success("Xoá thành công", { autoClose: "1500" })

        }
    }
    return (
        <React.Fragment>
            <section className="h-100 h-custom" style={{ backgroundColor: "#d2c9ff" }}>
                <div>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div
                                className="card card-registration card-registration-2"
                                style={{ borderRadius: 15 }}
                            >
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-8">
                                            <div className="p-5">
                                                <div className="d-flex justify-content-between align-items-center mb-5">
                                                    <h1 className="fw-bold mb-0 text-black">Giỏ hàng</h1>
                                                    <h6 className="mb-0 text-muted">{dataLocal.length} mặt hàng</h6>
                                                </div>
                                                {dataLocal.length ?
                                                    <div style={{ display: "flex", flexDirection: "row", width: "100%" }} className="row mb-2 d-flex justify-content-between align-items-center">
                                                        <div className="col-md-2 col-lg-2 col-xl-2">

                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                                            <h6 className="text-muted">Tên sản phẩm</h6>
                                                        </div>
                                                        <div style={{ display: "flex", justifyContent: "center" }} className="col-md-3 col-lg-3 col-xl-3">
                                                            <h6 className="text-muted">Số ngày thuê</h6>
                                                        </div>
                                                        {/* <div className="col-md-3 col-lg-3 col-xl-3">
                                                            <h6 className="text-muted">Description</h6>
                                                            <h6 className="text-black mb-0">{item.product.description}</h6>
                                                        </div> */}
                                                        <div style={{ display: "flex", justifyContent: "center" }} className="col-md-3 col-lg-3 col-xl-3">
                                                            <h6 className="text-muted">Giá tiền</h6>
                                                        </div>
                                                        <div className="col-md-1 col-lg-1 col-xl-1">
                                                            <h6 className="text-muted"></h6>                                                        </div>
                                                    </div> : ''}
                                                <hr className="mb-3 mt-1" />
                                                {dataLocal.length ? dataLocal.map((item) => (
                                                    <div style={{ display: "flex", flexDirection: "row", width: "100%" }} className="row mb-4 d-flex justify-content-between align-items-center">
                                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                                            <img
                                                                src={item.imageProduct}
                                                                className="img-fluid rounded-3"
                                                                alt="Cotton T-shirt"
                                                            />
                                                        </div>
                                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                                            {/* <h6 className="text-muted">Shirt</h6> */}
                                                            <h6 className="text-black mb-0">{item.nameProduct.substring(0, 17)}</h6>
                                                        </div>
                                                        <div style={{ alignItems: "center", justifyContent: "end" }} className="col-md-3 col-lg-3 col-xl-3 d-flex">
                                                            <button
                                                                className="btn btn-link px-2"
                                                                onClick={handleMonth}
                                                            >
                                                                <i className="fas fa-minus" />
                                                            </button>
                                                            <input
                                                                style={{ width: '50px' }}
                                                                id="form1"
                                                                min={1}
                                                                name="quantity"
                                                                value={item.day}
                                                                type="number"
                                                                className="form-control form-control-sm"
                                                            />
                                                            <button
                                                                className="btn btn-link px-2"
                                                                onClick={handleUpdateMonth}
                                                            >
                                                                <i className="fas fa-plus" />
                                                            </button>
                                                        </div>
                                                        {/* <div className="col-md-3 col-lg-3 col-xl-3">
                                                            <h6 className="text-black mb-0">{item.month}</h6>
                                                        </div> */}
                                                        {/* <div className="col-md-3 col-lg-3 col-xl-3">
                                                            <h6 className="text-muted">Description</h6>
                                                            <h6 className="text-black mb-0">{item.product.description}</h6>
                                                        </div> */}
                                                        <div style={{ display: "flex", justifyContent: "center" }} className="col-md-3 col-lg-3 col-xl-3">
                                                            {/* <h6 className="text-muted">Price</h6> */}
                                                            <h6 className="text-black mb-0">{formatMoney(item.priceProduct)}</h6>
                                                        </div>
                                                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                            <div style={{ cursor: 'pointer' }} className="text-muted">
                                                                <i onClick={() => onClickRemoveItemCart(item.productId)} className="fas fa-times" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )) :
                                                    <div style={{ width: "100%" }} >
                                                        <div style={{ width: '500px', clear: 'both', textAlign: 'center' }}>
                                                            <p>Chưa có sản phẩm nào !</p>
                                                        </div>
                                                    </div>
                                                }
                                                <hr className="my-4" />

                                                <div className="pt-5">
                                                    <h6 className="mb-0">
                                                        <NavLink to={'/auth/homePage'} className="text-body">
                                                            <i className="fas fa-long-arrow-alt-left me-2 mr-2" />
                                                            Quay  lại trang chủ
                                                        </NavLink>
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 bg-grey">
                                            <div className="p-5">
                                                <h5 className="text-uppercase mb-3">Mã giảm giá</h5>
                                                <div className="mb-5">
                                                    <div className="form-outline">
                                                        <input
                                                            type="text"
                                                            id="form3Examplea2"
                                                            className="form-control form-control-lg"
                                                        />
                                                        <label className="form-label mt-2" htmlFor="form3Examplea2">
                                                            Nhập mã của bạn
                                                        </label>
                                                    </div>
                                                </div>
                                                <hr className="my-4" />

                                                <div className="d-flex justify-content-between mb-5">
                                                    <h5 className="text-uppercase">Tổng giá</h5>
                                                    <h5>{formatMoney(sum)}</h5>
                                                </div>

                                                {token && decoded ? <button
                                                    disabled={btnDisabled}
                                                    type="button"
                                                    className="btn btn-dark btn-block btn-lg"
                                                    data-mdb-ripple-color="dark"
                                                    onClick={clickOrder}
                                                >

                                                    {btnDisabled ? 'Vui lòng chờ...' : 'Đặt hàng'}
                                                </button> : <NavLink to={'/auth/login'}> <button type="button"
                                                    className="btn btn-dark btn-block btn-lg"
                                                    data-mdb-ripple-color="dark">Vui lòng đăng nhập để đặt hàng ! </button> </NavLink>}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}

export default CartLocal