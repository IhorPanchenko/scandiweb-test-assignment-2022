import React from "react";
import PropTypes from "prop-types";
import { GlobalSvgSelector } from "../../../../assets/images/GlobalSvgSelector";
import "./CartSlider.scss";

export class CartSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
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

  next() {
    if (this.state.index === this.props.imgs.length - 1) {
      this.setState({ index: 0 });
    } else {
      this.setState({ index: this.state.index + 1 });
    }
  }

  prev() {
    if (this.state.index === 0) {
      this.setState({ index: this.props.imgs.length - 1 });
    } else {
      this.setState({ index: this.state.index - 1 });
    }
  }

  render() {
    const { imgs } = this.props;
    const { index } = this.state;

    return (
      <>
        <div className="cartImgWrapper">
          <img className="cartImg" src={imgs[index]} />
        </div>
        <div className="actions">
          <button onClick={this.prev}>
            <GlobalSvgSelector id="change-slide" />
          </button>
          <button onClick={this.next}>
            <GlobalSvgSelector id="change-slide" />
          </button>
        </div>
      </>
    );
  }
}

CartSlider.propTypes = {
  imgs: PropTypes.array,
};
