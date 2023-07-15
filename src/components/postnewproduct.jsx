import React, {useState} from "react";
import { fetchFromAPI } from "../api";

const PostNewProduct = () => {

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [type, setType] = useState('')
    const [imageLink, setImageLink] = useState('')

    const handleSubmit = async(event) => {
        event.preventDefault();

        const requestBody = {
            name,
            description: desc,
            price,
            stock,
            type,
            image: imageLink
        }

        const product = await fetchFromAPI({
            path: '/products',
            method: 'post',
            body: requestBody

        })

        console.log(product);

        setName('');
        setDesc('');
        setPrice('');
        setStock('');
        setType('');
        setImageLink('');
       

    }


    return (
        <div id='new-product-page'>
            <form id='new-product-form' onSubmit={handleSubmit}>
                <label>Product name: </label>
                <input type='text' id='new-product-input' value={name} onChange={(event) => {
                    setName(event.target.value)
                }}></input>
                <label>Product description: </label>
                <textarea type='text' id='new-product-input' value={desc} onChange={(event) => {
                    setDesc(event.target.value)
                }}></textarea>
                <label>Product price: </label>
                <input type='text' id='new-product-input' value={price} onChange={(event) => {
                    setPrice(event.target.value)
                }}></input>
                <label>Product stock: </label>
                <input type='text' id='new-product-input' value={stock} onChange={(event) => {
                    setStock(event.target.value)
                }}></input>
                <label>Product type: </label>
                <input type='text' id='new-product-input' value={type} onChange={(event) => {
                    setType(event.target.value)
                }}></input>
                <label>Product image link: </label>
                <input type='text' id='new-product-input' value={imageLink} onChange={(event) => {
                    setImageLink(event.target.value)
                }}></input>
                <button type="submit">Create product</button>
            </form>
        </div>
    )
}

export default PostNewProduct