import React from "react";
import { client } from "../../index";
import { getProducts } from "../../helpers/gqlQueries";
import ProductItem from "../../shared/ProductItem/ProductItem";
import s from "./Category.module.scss";

export class Caterogy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      category: this.props.category,
      loading: true,
      error: false,
    };
  }

  getData() {
    client
      .query({
        query: getProducts(this.props.category),
      })
      .then(({ loading, error, data }) => {
        this.setState({
          products: data.category.products,
          loading,
          error,
        });
      });
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.getData();
    }
  }

  render() {
    const products = this.state.products;

    if (this.state.loading) return <p>Loading...</p>;
    if (this.state.error) return <p>Error: </p>;

    return (
      <div className={s.products}>
        <h2>{this.props.category}</h2>
        <div className={s.productItems}>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }
}
