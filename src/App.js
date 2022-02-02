import React from "react";
import {
  useParams,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Header } from "./shared/Header/Header";
import { Caterogy } from "./pages/Category/Category";
import ProductDetail from "./shared/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";

export default class App extends React.Component {
  render() {
    const ProductDetailWrapper = (props) => {
      const params = useParams();
      return <ProductDetail {...{ ...props, match: { params } }} />;
    };

    return (
      <Router>
        <div className="container">
          <Header />
          <Routes location={this.props.location}>
            <Route path="/" element={<Caterogy category="all" />} />
            <Route path="/tech" element={<Caterogy category="tech" />} />
            <Route path="/clothes" element={<Caterogy category="clothes" />} />
            <Route
              path="/products/:productId"
              element={<ProductDetailWrapper />}
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
