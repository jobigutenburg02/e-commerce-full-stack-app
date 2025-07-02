import HomeCard from '../home/HomeCard'

// This component displays a list of related products using HomeCard
const RelatedProducts = ({products}) => {
  return (
    <section>
        <div>
            <h2>Related products</h2>
            {/* Render a grid of related product cards */}
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {products.map(product => 
                  // Render each related product using HomeCard component
                  <HomeCard key={product.id} product={product}/>
                )}
            </div>
        </div>
    </section>
  )
}

export default RelatedProducts