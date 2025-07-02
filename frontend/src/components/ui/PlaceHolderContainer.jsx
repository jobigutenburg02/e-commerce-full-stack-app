import React from 'react'
import PlaceHolder from './PlaceHolder'

// This component displays multiple loading skeletons for product cards
const PlaceHolderContainer = () => {
    // Create an array of 14 numbers to render 14 placeholders
    const placeNumbers = [...Array(14).keys()].slice(0);

  return (
    <section className="py-5" id="shop">
        {/* Section title */}
        <h4 style={{textAlign:"center"}}>Our Products</h4>
        <div className="container px-4 px-lg-5 mt-5">
            <div className="row justify-content-center">
                {/* Render a PlaceHolder component for each number in placeNumbers */}
                {placeNumbers.map(num => <PlaceHolder key={num}/>)}
            </div>
        </div>
    </section>
  )
}

export default PlaceHolderContainer