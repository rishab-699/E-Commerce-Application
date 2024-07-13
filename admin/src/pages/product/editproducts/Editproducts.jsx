import React from 'react'
import Addproduct from '../../../components/addproduct/Addproduct'
import Updateproduct from '../../../components/updateproduct/Updateproduct'
import './editproduct.css'
export default function Editproducts({isEdit}) {
  return (
    <div className='editproducts'>
      {isEdit?(<Addproduct/>):(<Updateproduct/>)}
    </div>
  )
}
