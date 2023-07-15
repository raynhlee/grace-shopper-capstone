import React, {useState, useEffect} from 'react'
import { fetchFromAPI } from '../api'
import AddToCart from './addToCart';
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";


const SearchProducts = ({searchTerm, count, setCount, user, onSingleProductPage, token, setOnSngleProductPage}) => {

    const [products, setProducts] = useState([]);

    console.log(searchTerm)

    const getProducts = async() => {
        setOnSngleProductPage(false)
        const data = await fetchFromAPI({
            path: `/products`
        })

        
        setProducts(data);
        
    }

    useEffect(() => {
        getProducts()
    }, [])


    return(
        
    <>
      <div>
      {
          user.isAdmin 
          ? <Link to='/admin/newproduct'><button id='new-product-button'>Post a new product</button></Link>
          : null
          
        }
        <h1 id="product-page-header">Search Results</h1>
        <div id="products-div">
          <div id="how-are-shopping">
            <h2 id="how-shop-header">How are you shopping today?</h2>
            <button
              id="pickup-div"
              onClick={() => {
                nonfunctionalButton();
              }}
            >
              <h3 id="pickup-method"> Pickup</h3>
              <p id="pickup-desc">In-store pickup, ready within 2 hours</p>
            </button>
            <button
              id="pickup-div"
              onClick={() => {
                nonfunctionalButton();
              }}
            >
              <h3 id="pickup-method"> Same Day Delivery</h3>
              <p id="pickup-desc">
                Schedule contactless deliveries as soon as today
              </p>
            </button>
            <button
              id="pickup-div"
              onClick={() => {
                nonfunctionalButton();
              }}
            >
              <h3 id="pickup-method"> Shipping</h3>
              <p id="pickup-desc">Free with FretCard or $350 orders*</p>
            </button>
            <div id="exclusions-div">
              <p id="exclusions">*Exclusions apply</p>
            </div>
          </div>
          <div id="products-container">
            <div id="all-products">
              {products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) || product.description.toLowerCase().includes(searchTerm.toLowerCase().trim())).map((product, index) => (
                 <Card
                 key={index}
                 id={index}
                 style={{
                   boxShadow: "none",
                   borderRadius: "0px",
                   width: "28%",
                   marginBottom: "20px",
                   marginLeft: "10px",
                 }}
                 className="product-card"
               >
                 <CardMedia>
                   <img
                     className="product-image"
                     src={product.image && product.image}
                     alt={product.title}
                     height={200}
                   />
                 </CardMedia>
                 <CardContent>
                   <Link to={`/products/${product.id}`}>
                     <button id="product-title">{product.name}</button>
                   </Link>
                   <Typography>${product.price}</Typography>
                   <p id="when-purchased-online">When purchased online</p>
                 </CardContent>
                 <AddToCart
                   product={product}
                   count={count}
                   setCount={setCount}
                   setProducts={setProducts}
                   user={user}
                   onSingleProductPage={onSingleProductPage}
                   token = {token}
                 />
               </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
       
    )
}

export default SearchProducts;