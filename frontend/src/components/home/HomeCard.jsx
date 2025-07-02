import styles from "./HomeCard.module.css"
import { Link } from "react-router-dom"
import { BASE_URL } from "../../api"

// HomeCard displays a single product on the homepage.
// It shows the product image, name, and price, and links to the product detail page.
const HomeCard = ({ product }) => {
  return (
    <div className={`col-md-3 ${styles.col}`}>
      <Link to={`/products/${product.slug}`} className={styles.link}>
        <div className={styles.card}>
          {/* Product Image */}
          <div className={styles.cardImgWrapper}>
            <img
              src={`${BASE_URL}${product.image}`}
              className={styles.cardImgTop}
              alt="Product Image"
            />
          </div>
          {/* Product Details */}
          <div className={styles.cardBody}>
            <h5 className={`${styles.cardTitle} mb-1`}>{product.name}</h5>
            <h6 className={styles.cardText}>{`\u20b9${product.price}`}</h6>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default HomeCard