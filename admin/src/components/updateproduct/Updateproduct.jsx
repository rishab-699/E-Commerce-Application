import React,{useState, useRef} from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './updateproduct.css'
import Chart from '../chart/Chart';


export default function Updateproduct() {
  const search = useLocation()
  const id = search.pathname.split('/')[2];
  const [productData, setProductData] = useState();
  const [addImg,setAddImg] = useState();
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
  const totalQuantity = useRef();
  const Description = useRef('');
  const subcategory = useRef('');
  const catrgory2 = useRef('');
  const [spanErr, setSpanerr] = useState('');
  const [productImg, setProductImg] = useState();
  const PI = "http://localhost:5000/images/";
  const [chartData, setChartdata] = useState()
  useEffect(()=>{
    const fetchData = async ()=>{
      const resProduct = await axios.get(`/api/product/find/${id}`);
      setProductData(resProduct.data);
      setAddImg(PI+resProduct.data.img);
      setMainCategory(resProduct.data.category[0])
      resProduct.data.detail.length!==0 && setSizes(resProduct.data.detail);
      const admintoken = await localStorage.getItem("adminAccess")
        const token = admintoken.replace(/["]+/g, '');
      const resCount = await axios.get(`/api/order/productPerformance/${id}`, {headers:{'token':`Bearer ${token}`}})
      setChartdata(resCount.data);
    }
    fetchData();
  },[])


  const handleQuantityChange = (event, sizeId) => {
    const { value } = event.target;
    //console.log(value, ' ', sizeId);
  
    // Convert value to a number
    const newQuantity = parseInt(value);
  
    // Update the state based on the sizeId
    setSizes(prevSizes => prevSizes.map(item =>
      (item._id === sizeId) ? { ...item, quantity: newQuantity } : item
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
        let productImgName = null;
        let productData;
        if(productImg){
          const data = new FormData();
          const filename = Date.now() + productImg.name;
          data.append("name", filename);
          data.append("file", productImg);
          //console.log(data);
          await axios.post('http://localhost:5000/api/upload', data );
          productImgName = filename;
           productData = {
            pname: title.current.value,
            price: price.current.value,
            qty: totalQuantity.current.value,
            category: [maincategory, subcategory.current.value, catrgory2.current.value],
            detail: sizes,
            description: Description.current.value,
            img: productImgName
          };
        }else{
          productData = {
            pname: title.current.value,
            price: price.current.value,
            qty: totalQuantity.current.value,
            category: [maincategory, subcategory.current.value, catrgory2.current.value],
            detail: sizes,
            description: Description.current.value,
          };
        }
        
        
        //console.log('productData');
        //console.log(productData);
        const admintoken = await localStorage.getItem("adminAccess")
        const token = admintoken.replace(/["]+/g, '');
        //console.log('add product token: ', token)
        await axios.put(`/api/product/${id}`, productData, {headers:{'token':`Bearer ${token}`}});
        alert('product updated');
        window.location.replace(`/updateproducts/${id}`)
      } catch (error) {
        alert('server side error');
      }
      
    }else{
      setSpanerr('* select category');
      //console.log(spanErr);
    }
  }
  const HandleDelete = async(e)=>{
    const admintoken = await localStorage.getItem("adminAccess")
        const token = admintoken.replace(/["]+/g, '');
        //console.log('add product token: ', token);
        try {
          await axios.delete(`/api/product/${id}`, {headers:{'token':`Bearer ${token}`}});
          alert('product Deleted successfully');
          window.location.replace(`/products`);
        } catch (error) {
          alert('something went wrong');
        }
        
  }
  return (
    <div className='addProduct'>
      {productData && <div className="form">
        <span className="formTitle">Update/view product</span>
        <button className='ProductDeleteButton' onClick={HandleDelete}>Delete Product</button>
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
              <input type="text" ref={title} defaultValue={productData.pname} className='addInputTag' placeholder='Add Title' required/>
            </div>
            <div className="input-container">
              <label className="inputTitle">Product price</label>
              <input type="text" ref={price} defaultValue={productData.price} className='addInputTag' placeholder='Add Price' required/>
            </div>
            {productData.detail.length !== 0 && <div className="input-container">
            <label className="inputTitle">Sizes</label>
            <div className="sizes">
              {productData.detail && productData.detail.map((data, index)=>{
                return <div key={index} className="input-container">
                <label className="inputTitle">
                  <input type="checkbox" value={data.size[0]} className="addInputCheckbox"/>
                  {data.size}
                </label>
                <input type="number" defaultValue={data.quantity} className="addInputTag" min={1} onChange={(e) => handleQuantityChange(e, data._id)} />
              </div>
              })}
            
            </div>
            </div>}
            <div className="input-row">
              <div className="input-container">
                <label className="inputTitle">Total Quantity</label>
                <input type="Number" ref={totalQuantity} value={productData.qty} className='addInputTag'/>
              </div>
              <div className="input-container">
                <label className="inputTitle">Product Category</label>
                <select name="" className='addInputTag' value={productData.category[0]} onChange={HandleCategory} placeholder='--Main Category--' id="">
                  <option value="Sarees" >Sarees</option>
                  <option value="Kurtis">Kurtis</option>
                  <option value="Indo-Western">Indo Western</option>
                  <option value="Dress Materials">Dress Materials</option>
                </select>
              </div>
              <div className="input-container">
                <label className="inputTitle">Sub-Category</label>
                <select className='addInputTag' ref={subcategory} value={productData.category[1]} placeholder='--Sub Category--' id="">
                   <option value={productData.category[1]}>{productData.category[1]}</option>
                  
                </select>
              </div>
              <div className="input-container">
                <label className="inputTitle">Product Stitching</label>
                <select name="" ref={catrgory2} className='addInputTag' value={productData.category[2]} required onChange={HandleSizeinput} placeholder='--Main Category--' id="">
                  <option value="unstitched">UnStitched</option>
                  <option value="Stitched" >Stitched</option>
                </select>
              </div>
            </div>
            <div className="input-container">
              <label className="inputTitle">Description</label>
              <textarea className='addInputTag' ref={Description} defaultValue={productData.description} required></textarea>
            </div>
            
            <div className="input-container sbtBtnContainer">
              <button type='submit' className="addProductBtn">Update Product</button>
            </div>
          </div>
        </form>
      </div>}
      {chartData&& <Chart title="Product Analytics" data={chartData} dataKey="Product Ordered" grid={true} />}
    </div>
  )
}
