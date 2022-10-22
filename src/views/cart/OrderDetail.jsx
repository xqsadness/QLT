import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_CONFIRM_PAYMENT } from 'utils/const';
import { API_GET_ORDER_DETAIL } from 'utils/const';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Countdown from "react-countdown";
import { BsFiles } from 'react-icons/bs';
import Order from './OrderConponent';
import { MenuItem, Select } from '@mui/material';
import ShowBank from './ShowBank';
import ComponentRightInfo from './ComponentRightInfo';
import { API_ORDER_RE_ORDER } from 'utils/const';

function OrderDetail() {

    let token = localStorage.getItem('token')

    // const search = window.location.search;
    // const params = new URLSearchParams(search);
    // const id = params

    let idOrderInURL = window.location.pathname.replace(/\D/g, "");

    const [isConfirm, setIsConFirm] = useState(false)
    const [valueStatus, setValueStatus] = useState('')
    const [dataDetail, setDataDetail] = useState([])
    const [data, setData] = useState([])
    const [isExtended, setIsExtended] = useState(true);
    const [order, setOrder] = useState([]);
    const history = useHistory()

    const onChangeExtendedStatus = () => {
        setIsExtended(!isExtended)
        reOrder();
    }

    const getAllOderDetail = async (e) => {
        if (token) {
            try {
                const response = await axios.get(API_GET_ORDER_DETAIL + idOrderInURL, {
                    headers: {
                        'authorization': 'Bearer ' + token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                if (response.status === 200) {
                    setDataDetail(response.data.orderDetail)
                    setData(response.data)
                }
                else {
                    toast.success('Không có đơn hàng này !', {
                        autoClose: 3000
                    })
                    history.push('/auth/cart')
                }
            } catch (error) {
                if (error && error.response.status === 400 || error.response.status === 404) {
                    toast.warning('Không có mã đơn hàng này !', {
                        autoClose: 3000
                    })
                    history.push('/auth/cart')
                }
            }
        } else {
            toast.success('Please login', {
                autoClose: 3000
            })
            history.push('/auth/login')
        }
    }


    const checkout = async () => {
        console.log('checkout ');
        try {
            if (token) {
                if (data.status === 'NEW') {
                    setIsConFirm(true)
                    const response = await axios.put(API_CONFIRM_PAYMENT + idOrderInURL, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response && response.status === 200) {
                        toast.success('Success', {
                            autoClose: 3000
                        })
                        setTimeout(() => {
                            window.location.reload()
                        }, 1800);
                    };
                    setIsConFirm(true)
                }
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

    const reOrder = async () => {
        try {
                
                // const response = await axios.put(API_ORDER_RE_ORDER , {}, {
                //     headers: {
                //         'Authorization': `Bearer ${token}`,
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json'
                //     }
                // });
                // if (response && response.status === 200) {
                //     toast.success('Success', {
                //         autoClose: 3000
                //     })
                //     setTimeout(() => {
                //         window.location.reload()
                //     }, 1800);
                // };
            
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

    const Completionist = () => <div>cc</div>
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return <Completionist />
        } else {
            // Render a countdown
            return (
                <span>
                    {hours}:{minutes}:{seconds}
                </span>
            );
        }
    };
    useEffect(() => {
        // startTimer()
        getAllOderDetail();
        console.log(order)
        if (data.status === 'NEW') {
            // setValueStatus('Thanh toán')
            setIsConFirm(false)
        } else if (data.status === 'USER_CONFIRMED') {
            // setValueStatus('Vui lòng chờ admin phê duyệt đơn hàng của bạn !')
            setIsConFirm(true)
        } else if (data.status === 'CANCELLED') {
            // setValueStatus('Bạn đã huỷ đơn hàng này')
            setIsConFirm(true)
        } else if (data.status === 'PAID') {
            // setValueStatus('Đã xác nhận')
            setIsConFirm(true)
        }
    }, [])

    const [bank, setBank] = React.useState('mbbank');

    const handleChange = (event) => {
        setBank(event.target.value);
    };

    const listBank = {
        mbank: '0123 56 81923 123 725',
        bidv: '9123 8123 9123 92',
        vpbank: '82131 1312 1231 09',
        tpbank: '086 3217 3123 123',
        vib: '19883 08213 9123 32',
    }

    return (
        <div style={{ marginTop: '20px', backgroundColor: 'white' }}>

            <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
                <div style={{ width: '1000px' }} >
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <h5 className="mb-3">
                                                {data.hasParent ?
                                                    <NavLink to={'/auth/order/' + data.parentId} className="text-body">
                                                        <i className="fas fa-long-arrow-alt-left me-2 mr-2" />
                                                        tro lai order chinh
                                                    </NavLink>
                                                    :
                                                    <NavLink to={'/auth/cart'} className="text-body">
                                                        <i className="fas fa-long-arrow-alt-left me-2 mr-2" />
                                                        Tiếp tục thuê trụ
                                                    </NavLink>
                                                }

                                            </h5>
                                            <hr />
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    {/* <p className="mb-0">You have {dataDetail.length} items </p> */}
                                                </div>
                                            </div>

                                            <Order order={data}
                                                isExtended={isExtended}
                                                orderData={(data2) => setOrder(data2)}
                                            />
                                            {dataDetail ?
                                                dataDetail.map((item, index) => (
                                                    <div className="card mb-3" key={index}>

                                                    </div>
                                                ))

                                                : <h2> Chưa có sản phẩm nào </h2>}
                                        </div>
                                        <ComponentRightInfo bank={bank} listBank={listBank} handleChange={handleChange} data={data} renderer={renderer}
                                            checkout={checkout} isConfirm={isConfirm} valueStatus={valueStatus} onChangeExtendedStatus={onChangeExtendedStatus} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >


        </div >
    )
}

export default OrderDetail