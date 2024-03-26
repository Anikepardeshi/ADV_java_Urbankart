import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from '../services/product.service';
import store from "../redux/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CartItem from "../models/item";
import cartService from "../services/cart.service";

export const ProductsDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imageURL, setImageURL] = useState('');

  const navigate = useNavigate();

  const currentUser = store.getState().user;
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [categorie, setCategorie] = useState([]);
  let componentMounted = true;
  const BASE_URL="http://localhost:8080/products/";

  const dispatch = useDispatch();

  const addProduct = (product) => {
    // dispatch(addCart(product))
    if(!currentUser){
      toast.success("You should Login First" ,{autoClose: 1500});
      navigate('/login')
      return;
    }
    const item=new CartItem(1,currentUser.id,product.id);
    cartService.addToCart(item).then((resp)=>{
      toast.success("Item Added To Cart" ,{autoClose: 1500});
    });
  } 


  useEffect(() => {
    // Fetch product details
    ProductService.getProductById(id).then((response) => {
      setProduct(response.data);
    });

    // Fetch product image
    ProductService.getProductImage(id).then((response) => {
      // Assuming the response type is blob
      const imageURL = URL.createObjectURL(response.data);
      setImageURL(imageURL);
    }).catch(error => {
      console.error('Error fetching product image:', error);
    });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center', maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>{product.name}</h2>
      <div style={{ marginBottom: '20px', maxWidth: '300px', margin: 'auto' }}>
        {imageURL && <img src={imageURL} alt="Product" style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />}
      </div>
      <div style={{ backgroundColor: 'white', color: 'black', borderRadius: '10px', padding: '20px', textAlign: 'left' }}>


      <p style={{ marginBottom: '10px', fontSize: '18px' }}><strong>Name :</strong> {product.name}</p>
        <p style={{ marginBottom: '10px', fontSize: '18px' }}><strong>Description:</strong> {product.description}</p>
        <p style={{ marginBottom: '10px', fontSize: '18px' }}><strong>Price:</strong> Rs. {product.price}</p>
        {/* Add more details as needed */}
      </div>

      <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                    Add to Cart
                  </button>
    </div>
  );
};
