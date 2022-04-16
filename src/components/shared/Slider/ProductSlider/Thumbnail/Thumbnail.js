import React from "react";
import PropTypes from "prop-types";
import "./Thumbnail.scss";

export class Thumbnail extends React.Component {
  render() {
    const { arr, image, index } = this.props;

    return (
      <div className="tumbnail">
        {arr.map((imgsrc, i) => (
          <div className="imgWrapper" key={i}>
            <img
              src={imgsrc}
              onClick={() => image(i)}
              className={index === i ? "active" : ""}
            />
          </div>
        ))}
      </div>
    );
  }
}

Thumbnail.propTypes = {
  arr: PropTypes.array,
  image: PropTypes.func,
  index: PropTypes.number,
};
