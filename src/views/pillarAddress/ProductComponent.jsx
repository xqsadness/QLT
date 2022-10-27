import Countdown from "react-countdown";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import React from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { API_ADD_CART } from "utils/const";
import { Button } from "@mui/material";
import { formatMoney } from "common/formatMoney";
import { API_ADD_CART_PRE_ORDER } from "utils/const";
import Moment from "react-moment";

function ProductComponent({ product }) {

  const renderer = ({ hours, minutes, completed }) => {
    if (completed) {
      // Render a completed state
      return <div>Đã hết hạn</div>;
    } else {
      // Render a countdown
      return <span className="detail-time">{hours}:{minutes}</span>;
    }
  };

  const buttons = (isPreOrdered, isAvailable,) => {
    if (isAvailable) {
      return <button className="btn btn-success">Thêm vào giỏ</button>
    }
    if (!isPreOrdered) {
      return <button className="btn btn-success">Đặt hàng</button>
    }

  }


  const history = useHistory()

  let token = localStorage.getItem('token')

  const addCart = async (item) => {

    // save product to cart local
    const { id, name } = item;
    let listCart = localStorage.getItem("cartTemp")
    let listCartADD = localStorage.getItem("cartADD")

    let listCartItem = []
    let listCartADDItem = []

    if (listCart && listCartADD != undefined) {
      listCartItem = JSON.parse(listCart)
      listCartADDItem = JSON.parse(listCartADD)
    }
    let checkCartHasBeen = true

    try {
      if (token) {
        // when already login
        const response = await axios.post(API_ADD_CART, {
          month: 1,
          productId: id
        }, {
          headers: {
            'authorization': 'Bearer ' + localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        if (response && response.status === 201) {
          toast.success('Thêm vào giỏ hàng thành công', {
            autoClose: 3000
          })
          history.push('/auth/cart')
        };
      } else {
        // when don't login
        for (let i = 0; i < listCartItem.length; i++) {
          if (listCartItem[i].productId === item.id && listCartADDItem[i].productId === item.id) {
            // localStorage.setItem('cartTemp', JSON.stringify(listCartItem));
            checkCartHasBeen = false
          }
        }
        if (checkCartHasBeen == true) {
          let items = {
            month: 1,
            productId: item.id,
            nameProduct: item.name,
            priceProduct: item.price,
            imageProduct: item.photosImagePath
          }
          let itemsADD = {
            month: 1,
            productId: item.id
          }

          listCartItem.push(items)
          listCartADDItem.push(itemsADD)
          localStorage.setItem('cartTemp', JSON.stringify(listCartItem));
          localStorage.setItem('cartADD', JSON.stringify(listCartADDItem));
        }
        toast.success('Thêm vào giỏ hàng thành công', {
          autoClose: 3000
        })
        history.push('/auth/cart')
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
  const addCartPreOrder = async (item) => {
    // save product to cart local
    const { id, name } = item;
    try {
      if (token) {
        // when already login
        const response = await axios.post(API_ADD_CART_PRE_ORDER, {
          month: 1,
          productId: id
        }, {
          headers: {
            'authorization': 'Bearer ' + localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        if (response && response.status === 201) {
          toast.success('Thêm vào giỏ hàng thành công', {
            autoClose: 3000
          })
          history.push('/auth/cart')
        };
      } else {
        // when don't login
        toast.warning('Vui lòng đăng nhập để sử dụng tính năng này !', {
          autoClose: 1500
        })
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
  console.log("product true ", product);
  return (
    <div style={{ display: "flex", width: "175vh", flexWrap: "wrap", justifyContent: "center", marginTop: '50px', marginBottom: '150px' }}>
      {
        product.map((item, index) => (
          <div style={{ float: "left", position: 'relative', backgroundColor: "#ddd", marginTop: '20px', width: "45%", margin: "5px", display: "flex", padding: "10px", borderRadius: "8px", }}>
            <div style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <img style={{ width: '100%', height: 250, borderRadius: "8px" }} src={item.photosImagePath} alt="" />
            </div>
            <div style={{ width: "50%", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <h1 style={{ fontSize: "2em", marginBottom: '10px' }}> {item.name}</h1>
              <h2 style={{ color: '#32cd32' }}> {formatMoney(item.price)} VNĐ</h2>
              <h3>Loại trụ: {item.category.name}</h3>
              <h4> {item.description}</h4>
              {item.status === 'AVAILABLE' ?
                <Button onClick={(e) => addCart({ ...item })} variant="contained" color="success">
                  Thêm vào giỏ
                </Button> :
                <Button disabled variant="contained" >
                  Đã cho thuê
                </Button>}
              {item.expiredDate !== null ? <h4 style={{marginTop: '15px'}}> Ngày hết hạn: <span style={{color:'red'}}> <Moment format="DD/MM/YYYY">{item.expiredDate}</Moment></span> </h4> : ''}
            </div>
            {item.preOrdered === false ?
              <Button sx={{ height: '9vh', fontSize: '0.6em', width: '10%', position: 'absolute', top: '0', right: '0', backgroundColor: ' #F4364C' }}
                onClick={(e) => addCartPreOrder({ ...item })} variant="contained" >
                Đặt trước
              </Button> : ''}
          </div>
        ))
      }</div>
    // <TableRow hover role="checkbox" >
    //   <TableCell sx={{}}>
    //     <img style={{ width: '80px', borderRadius: "8px" }} src={product.photosImagePath} alt="" />
    //   </TableCell>
    //   <TableCell sx={{ textAlign: 'center' }}>{product.name}</TableCell>
    //   <TableCell sx={{ textAlign: 'center' }}>{product.category.name}</TableCell>
    //   <TableCell sx={{ textAlign: 'center' }}>{product.price}</TableCell>

    //   <TableCell sx={{ textAlign: 'right' }}>
    //     <Countdown
    //       date={product.expiredDate}
    //       renderer={renderer}
    //     ></Countdown>
    //     {buttons(product.isPreOrdered, product.status === "AVAILABLE")}
    //   </TableCell>
    // </TableRow>

  )
}


export default ProductComponent;