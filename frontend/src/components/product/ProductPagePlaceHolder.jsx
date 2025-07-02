import React from 'react'

// This component displays a loading skeleton while product data is being fetched
const ProductPagePlaceHolder = () => {
  return (
    <section className="py-3">
        <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
                {/* Placeholder for product image */}
                <div className="col-md-6">
                <img 
                className="card-img-top mb-5 mb-md-0" 
                src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg" 
                alt="..." 
                />
                </div>
                {/* Placeholder for product details */}
                <div className="col-md-6">
                    {/* Placeholder bars for title, price, etc. */}
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-12"></span>
                    <span className="placeholder col-4"></span>

                    {/* Placeholder bars for description */}
                    <p className="lead">
                    <span className="placeholder col-12"></span>
                    <span className="placeholder col-12"></span>
                    <span className="placeholder col-12"></span>
                    <span className="placeholder col-12"></span>
                    <span className="placeholder col-12"></span>
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ProductPagePlaceHolder