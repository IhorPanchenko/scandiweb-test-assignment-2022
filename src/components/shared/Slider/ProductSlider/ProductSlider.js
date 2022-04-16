import React from "react";
import PropTypes from "prop-types";
import { Thumbnail } from "./Thumbnail/Thumbnail";
import "./ProductSlider.scss";

export class ProductSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };

    this.setIndex = this.setIndex.bind(this);
  }

  componentDidMount() {
    this.setState({
      index: 0,
    });
  }

  setIndex(i) {
    this.setState({ index: i });
  }

  render() {
    const { imgs } = this.props;
    const { index } = this.state;

    return (
      <>
        <Thumbnail arr={imgs} image={this.setIndex} index={index} />

        <div className="mainImgWrapper">
          <img className="mainImg" src={imgs[index]} />
        </div>
      </>
    );
  }
}

ProductSlider.propTypes = {
  imgs: PropTypes.array,
};
