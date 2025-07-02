import ProductPagePlaceHolder from './ProductPagePlaceHolder'
import RelatedProducts from './RelatedProducts'
import { useParams } from 'react-router-dom'
import api from '../../api'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../../api'
import { toast } from 'react-toastify'

// This component displays detailed info about a single product
const ProductPage = ({setNumCartItems}) => {
    const {slug} = useParams() // Get the product slug from the URL
    
    const [product, setProduct] = useState({})
    const [similarProducts, setSimilarProducts] = useState([]) 
    const [loading, setLoading] = useState(true)
    const [inCart, setInCart] = useState(false)

    const cart_code = localStorage.getItem("cart_code")

    // Check if the product is already in the cart whenever product.id or cart_code changes
    useEffect(function(){
        if(product.id){
            api.get(`product_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
            .then(res => {
                console.log(res.data)
                setInCart(res.data.product_in_cart)
            })
            .catch(err => {
                console.log(err.message)
            })    
        }
    },[cart_code, product.id])

    // Prepare new item object for adding to cart
    const newItem = {cart_code: cart_code, product_id: product.id}
 
    // Function to add the product to the cart
    function add_item(){
        api.post("add_item/", newItem)
        .then(res => {
            console.log(res.data)
            setInCart(true) // Mark as in cart
            toast.success("Product added to cart successfully")
            setNumCartItems(curr => curr + 1) // Update cart item count
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    // Fetch product details and similar products when slug changes
    useEffect(function(){
        api.get(`product_detail/${slug}`)
        .then(res => {
            console.log(res.data)
            setProduct(res.data)
            setSimilarProducts(res.data.similar_products)
            setLoading(false)
        })
        .catch(err => {
            console.log(err.message)
            setLoading(false)
        })
    },[slug])

    // Show loading placeholder while fetching data
    if(loading){
        return <ProductPagePlaceHolder />
    }

  return (
    <div>
        <section className="py-3">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    {/* Product image */}
                    <div className="col-md-6">
                        <img 
                        className="card-img-top mb-5 mb-md-0" 
                        src={`${BASE_URL}${product.image}`}
                        alt="..." 
                        />
                    </div>

                    {/* Product details */}
                    <div className="col-md-6">
                        <div className="small mb-1">SKU: BST-498</div> 
                        <h1 className="display-5 fw-bolder">{product.name}</h1>
                        <div className="fs-5 mb-5"><span>{`₹${product.price}`}</span></div>
                        <p className="lead">{product.description}</p>
                        {/* Add-to-cart button */}
                        <div className="d-flex">
                            <button 
                            className="btn btn-outline-dark flex-shrink-0"
                            type="button"
                            onClick={add_item}
                            disabled={inCart}
                            >
                            <i className="bi-cart-fill me-1"></i>
                            {inCart? "Product added to cart": "Add to cart"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <RelatedProducts products={similarProducts}/>
    </div>
  )
}

export default ProductPage