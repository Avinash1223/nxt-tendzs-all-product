import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/products'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      //   console.log(fetchedData)
      const updatedData = fetchedData.products.map(eachProduct => ({
        title: eachProduct.title,
        id: eachProduct.id,
        price: eachProduct.price,
        imageUrl: eachProduct.image_url,
        rating: eachProduct.rating,
        brand: eachProduct.brand,
      }))
      this.setState({productsList: updatedData, isLoading: false})
    }
  }

  renderProductsList = () => {
    const {productsList, isLoading} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        {isLoading ? (
          <div testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
