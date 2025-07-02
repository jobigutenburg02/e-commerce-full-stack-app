import React from 'react'

// This component displays a loading skeleton for a product card
const PlaceHolder = () => {
  return (
    <div className="col-md-3 mb-5">
        {/* Card skeleton */}
        <div className="card" aria-hidden="true">
            {/* Placeholder for product image */}
            <div
            className="place-img"
            style={{height:"180px", backgroundColor:"lightgray"}}
            ></div>
            <div className="card-body">
                {/* Placeholder bars for product title/description */}
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-12 placeholder-xs"></span>
                    <span className="placeholder col-12 placeholder-xs"></span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default PlaceHolder