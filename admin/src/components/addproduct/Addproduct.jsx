import React from 'react'
import './addproduct.css'
import defaultsrc from '../../media/addImg.png'
import { useState } from 'react'
import { useRef } from 'react';
import axios from 'axios';

export default function Addproduct() {
  const [addImg,setAddImg] = useState(defaultsrc);
  const [sizes, setSizes] = useState([]);
  const [maincategory, setMainCategory] = useState();
  const sareeCategory = ['Printed Saree','Machine Work', 'Hand-Work', 'weaving Work'];
  const kurtiCategory = ['Single printed kurti', 'single Work Kurti', 'Kurti 2pcs pair', 'Kurti 3pcs pair'];
  const indowesternCategory = ['1pcs','2pcs','3pcs'];
  const [categorydata,setcategorydata] = useState(['No Data']);
  const [sizeinput, setSizeInput] = useState(false);
  const [size, setsize] = useState(false);
  const title = useRef('');
  const price = useRef('');
  const totalQuantity = useRef(1);
  const Description = useRef('');
  const subcategory = useRef('');
  const catrgory2 = useRef('');
  const [spanErr, setSpanerr] = useState('');
  const [productImg, setProductImg] = useState();
  const handleInputChange = (event, size) => {
    const { checked, value } = event.target;
    if (checked) {
      setSizes([...sizes, { size, quantity: 1 }]);
    } else {
      setSizes(sizes.filter(item => item.size !== size));
    }
  };

  const handleQuantityChange = (event, sizeId) => {
    const { value } = event.target;
    //console.log(value, ' ', sizeId);
  
    // Convert value to a number
    const newQuantity = parseInt(value);
  
    // Update the state based on the sizeId
    setSizes(prevSizes => prevSizes.map(item =>
      (item.size === sizeId) ? { ...item, quantity: newQuantity } : item
    ));
    //console.log(sizes)
  };

  const HandleImg = (event)=>{
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imgDataUrl = reader.result; // Data URL of the uploaded image
    setAddImg(imgDataUrl); // Update the state with the data URL
    //console.log(imgDataUrl);
    };

    if (file) {
      setProductImg(file);
      reader.readAsDataURL(file);
      //console.log(addImg)
    } 
  }

  const HandleCategory = (e)=>{
    setMainCategory(e.target.value);
    if(e.target.value === 'Sarees'){
      setcategorydata(sareeCategory);
    }else if(e.target.value === 'Kurtis'){
      setcategorydata(kurtiCategory);
    }else if(e.target.value ==="Indo-Western"){
          setcategorydata(indowesternCategory);
    }else if(e.target.value ==="Dress Materials"){
      setcategorydata(['printed cotton','work']);
    }else{
      setcategorydata(['No Data'])
    }
    //console.log(maincategory);
    //console.log(categorydata);
  }
  const HandleSizeinput = (e)=>{
    setSizeInput(e.target.value);
    if(e.target.value === 'Stitched'){
      setsize(true);
    }else{
      setsize(false);
    }
  }
  const HandleSubmit = async(e)=>{
    e.preventDefault();
    if(!(title.current.value && price.current.value && totalQuantity.current.value && Description.current.value && maincategory === undefined)){
      try {
        let productImgName = null
        if(productImg){
          const data = new FormData();
          const filename = Date.now() + productImg.name;
          data.append("name", filename);
          data.append("file", productImg);
          //console.log(data);
          await axios.post('http://localhost:5000/api/upload', data );
          productImgName = filename;
        }
        
        const productData = {
          pname: title.current.value,
          price: price.current.value,
          qty: totalQuantity.current.value,
          category: [maincategory, subcategory.current.value, catrgory2.current.value],
          detail: sizes,
          description: Description.current.value,
          img: productImgName
        };
        //console.log('productData');
        //console.log(productData);
        const admintoken = await localStorage.getItem("adminAccess")
        const token = admintoken.replace(/["]+/g, '');
        //console.log('add product token: ', token)
        await axios.post("/api/product/add", productData, {headers:{'token':`Bearer ${token}`}});
        alert('product added');
        window.location.replace('/products')
      } catch (error) {
        alert('server side error');
      }
      
    }else{
      setSpanerr('* select category');
      //console.log(spanErr);
    }
  }
  
  return (
    <div className='addProduct'>
      <div className="form">
        <span className="formTitle">Add new product</span>
        <div>
          <span className="formErr">{spanErr}</span>
        </div>
        <form onSubmit={HandleSubmit}>
          <div className="addFormImgContainer">
            <img src={addImg} alt="" />
            <div className="addImgForm">
              <label htmlFor="productImg" className='uploadIcon'><i className="fa-solid fa-upload " alt="Upload Image"></i></label>
              <input type="file" id="productImg" onChange={HandleImg} hidden/>
            </div>
          </div>
          <div className="addProductDetails">
            <div className="input-container">
              <label className="inputTitle">Product Title</label>
              <input type="text" ref={title} className='addInputTag' placeholder='Add Title' required/>
            </div>
            <div className="input-container">
              <label className="inputTitle">Product price</label>
              <input type="text" ref={price} className='addInputTag' placeholder='Add Price' required/>
            </div>
            {size && <div className="input-container">
            <label className="inputTitle">Sizes</label>
            <div className="sizes">
            <div className="input-container">
              <label className="inputTitle">
                <input type="checkbox" value="M" className="addInputCheckbox" onChange={(e) => handleInputChange(e, 'M')} />
                M
              </label>
              <input type="number" className="addInputTag" min={1} onChange={(e) => handleQuantityChange(e, 'M')} />
            </div>
              <div className="input-container">
                <label className="inputTitle"><input type="checkbox" value='L'  onChange={(e) => handleInputChange(e, 'L')} className='addInputCheckbok' />L</label>
                <input type="number" className='addInputTag' onChange={(e) => handleQuantityChange(e, 'L')} min={1}/>
              </div>
              <div className="input-container">
                <label className="inputTitle"><input type="checkbox" value='Xl'   onChange={(e) => handleInputChange(e, 'XL')} className='addInputCheckbok' />xl</label>
                <input type="number" className='addInputTag' onChange={(e) => handleQuantityChange(e, 'XL')} min={1}/>
              </div>
              <div className="input-container">
                <label className="inputTitle"><input type="checkbox" value='XXL'  onChange={(e) => handleInputChange(e, 'XXL')} className='addInputCheckbok' />xxL</label>
                <input type="number" className='addInputTag' onChange={(e) => handleQuantityChange(e, 'XXL')} min={1}/>
              </div>
              <div className="input-container">
                <label className="inputTitle"><input type="checkbox" value='3XL'  onChange={(e) => handleInputChange(e, '3XL')} className='addInputCheckbok' />3xL</label>
                <input type="number" className='addInputTag' onChange={(e) => handleQuantityChange(e, '3XL')} min={1}/>
              </div>
              <div className="input-container">
                <label className="inputTitle"><input type="checkbox" value='4XL'  onChange={(e) => handleInputChange(e, '4XL')} className='addInputCheckbok' />4xL</label>
                <input type="number" className='addInputTag' onChange={(e) => handleQuantityChange(e, '4XL')} min={1}/>
              </div>
              <div className="input-container">
                <label className="inputTitle"><input type="checkbox" value='5XL'  onChange={(e) => handleInputChange(e, '5XL')} className='addInputCheckbok' />5xL</label>
                <input type="number" className='addInputTag' onChange={(e) => handleQuantityChange(e, '5XL')} min={1}/>
              </div>
            </div>
            </div>}
            <div className="input-row">
              <div className="input-container">
                <label className="inputTitle">Total Quantity</label>
                <input type="Number" ref={totalQuantity} defaultValue={totalQuantity} className='addInputTag'/>
              </div>
              <div className="input-container">
                <label className="inputTitle">Product Category</label>
                <select name="" className='addInputTag' onChange={HandleCategory} placeholder='--Main Category--' id="">
                  <option value="Sarees" >Sarees</option>
                  <option value="Kurtis">Kurtis</option>
                  <option value="Indo-Western">Indo Western</option>
                  <option value="Dress Materials">Dress Materials</option>
                </select>
              </div>
              <div className="input-container">
                <label className="inputTitle">Sub-Category</label>
                <select className='addInputTag' ref={subcategory} placeholder='--Sub Category--' id="">
                  {categorydata && categorydata.map((value, index)=>{
                    return <option key={index} value={value}>{value}</option>
                  })}
                </select>
              </div>
              <div className="input-container">
                <label className="inputTitle">Product Stitching</label>
                <select name="" ref={catrgory2} className='addInputTag' required onChange={HandleSizeinput} placeholder='--Main Category--' id="">
                  <option value="unstitched">UnStitched</option>
                  <option value="Stitched" >Stitched</option>
                </select>
              </div>
            </div>
            <div className="input-container">
              <label className="inputTitle">Description</label>
              <textarea className='addInputTag' ref={Description} required></textarea>
            </div>
            
            <div className="input-container sbtBtnContainer">
              <button type='submit' className="addProductBtn">Add Product</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
