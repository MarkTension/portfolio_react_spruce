import { css } from "styled-components";

const sizes = {
  small: 639,
  medium: 1047,
  large: 1048,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  if (label === "large") {
    acc[label] = (...args) => css`
      @media (min-width: ${sizes[label]}px) {
        ${css(...args)};
      }
    `;
    return acc;
  } else if (label !== "large") {
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label]}px) {
        ${css(...args)};
      }
    `;
  }
  return acc;
}, {});

export default media;
