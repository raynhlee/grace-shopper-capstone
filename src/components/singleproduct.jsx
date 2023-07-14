import React, {useState, useEffect} from "react"
import { fetchFromAPI } from "../api";
import { useParams, useHistory } from "react-router-dom";
import AddToCart from "./addToCart";


const SingleProduct = ({count, setCount, setProducts, products, user, setOnSngleProductPage, onSingleProductPage, nonfunctionalButton}) => {
    const {id} = useParams(); 
    const [product, setProduct] = useState(null)
    const history = useHistory()

    const getProduct = async() => {
        
        const data = await fetchFromAPI({
            path:`/products/${id}`
        });

        setProduct(data);


    }

    useEffect(() => {
        const loadProduct = async () => {
            await getProduct();
        }
        loadProduct();
    }, []);
    
    useEffect(() => {
        setOnSngleProductPage(true);
    }, [])

    const deleteProduct = async () => {
        const data = await fetchFromAPI({
          path: `/products/${id}`,
          method: "delete",
        });
        if(data){
            alert('product was deleted')
           
            
        }

        history.push('/');

      };

return(
    <div id='single-product-main-div'>
        {product 
          &&  <>
        <h2 id='single-product-name'>{product.name}</h2>
        <div id='product-info-with-image'>
            <img src={product.image && product.image} id='single-product-image' />
            <div id='product-info'>
                <div>
                    <h5 id='product-price'>${product.price}</h5>
                    <p id='single-when-purchased-online'>When purchased online</p>
                    <p id='single-product-desc-header'>Details</p>
                    <p id='single-product-description'>{product.description}</p>
                    <div id='single-product-pickup-options-div'>
                       <button id='single-product-pickup' onClick={() => {nonfunctionalButton()}}>
                            <p id='single-product-pickup-text' style={{marginBottom: '27px'}}>Pickup</p>
                            <p id='ready-within-2-hours'>Ready within 2 hours</p>
                        </button>
                        <button id='single-product-pickup' onClick={() => {nonfunctionalButton()}}>
                            <p id='single-product-pickup-text'>Delivery</p>
                            <p id='ready-within-2-hours'>Select delivery window at checkout</p>
                        </button>
                        <button id='single-product-pickup' onClick={() => {nonfunctionalButton()}}>
                            <p id='single-product-pickup-text' style={{marginBottom: '27px'}}>Shipping</p>
                            <p id='ready-within-2-hours'>Get it within 3 business days</p>
                        </button>
                    </div>
                   
                    <AddToCart count = {count} setCount={setCount} setProducts={setProducts} user={user} product={product} onSingleProductPage={onSingleProductPage}/>
                    {
                        user.isAdmin 
                        ? <button id='single-product-add-to-cart' style={{marginTop: '0px'}} onClick={()=>{
                            console.log('button')
                            deleteProduct()
                        }}>Delete product</button>
                        : null
                    }
                </div>
            </div>
        </div>
        </>

        
}
       
    </div>
)
}

export default SingleProduct;