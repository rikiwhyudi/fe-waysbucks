import React, { useState, useEffect, useContext } from "react"
import Header from "../moduls/header"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext"
import { API } from "../config/api";
import success from "../../assets/ceklis.svg"
import failed from "../../assets/cancel.svg"

export default function Income() {
  const navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)

  const idr = new Intl.NumberFormat("id-ID")
  const [transaction, setTransaction] = useState([])

  const getTransaction = async () => {
    try {
      const res = await API.get(`/transactions`);
      setTransaction(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (state.isLogin === false || state.user.status === "customer") {
      navigate('/')
    } else {
      getTransaction()
    }
  },[])

  console.log(transaction)

    //  const handleApprove = (id) => {
    //   alert("langsung success kalo pay selesai..")
    //  }

 const handleClick = (id) => {
  alert("Oops.!!")
 }

  return (
    <>
    <Header />
    <main className="after-nav pb5">
      <section className="pt4 mx5">
          <h1 className="txt-red mb2-5">Income Transaction</h1>
          <table className="w-100">
            <thead className="bg-gray">
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Address</th>
                <th>Product</th>
                <th>Income</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { transaction.map((data, index)=>(               
              <tr>
                <td>{index+1}</td>
                <td>{data.user.name}</td>
                <td>-</td>
                <td>{data.cart.map((data,index)=>(
                <h6 className="productIncome" key={index}>
                    {data.product.title}, </h6>
                    ))}</td>
                <td>Rp.{idr.format(data.amount)}</td>
                <td>{data.status}</td>
                <td align="center">
                  { (data.status === "success") ?
                    <img src={success} alt="payment-success" /> 
                    :
                    <>
                    { (data.status === "failed") ? 
                       <img src={failed} alt="payment-failed" />
                      :
                      <>  
                      <button onClick={() => handleClick()} className="btn btn-danger me-2 btn-sm">cancel</button>
                      <button  onClick={() => handleClick()} className="btn btn-success btn-sm">approve</button>
                      </>
                    }
                    </>
                  } 
                </td>
              </tr>
              ))}
            </tbody>
          </table>
      </section>
    </main>
    </>
  )
}