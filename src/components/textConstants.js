import "./textConstants.css";

const Item = ({ children, style = {}, ...props }) => (
  <h3 className="item" style={style} {...props}>
    {children}
  </h3>
);

const ItemSmall = ({ children, style = {}, ...props }) => (
  <h3 className="item-small" style={style} {...props}>
    {children}
  </h3>
);

const Text = ({ children, style = {}, ...props }) => (
  <span className="text" style={style} {...props}>
    {children}
  </span>
);

const Hoverr = ({ children, style = {}, ...props }) => (
  <h3 className="hoverr" style={style} {...props}>
    {children}
  </h3>
);

const HoverText = ({ children, style = {}, ...props }) => (
  <h3 className="hover-text" style={style} {...props}>
    {children}
  </h3>
);

const Title = ({ children, style = {}, ...props }) => (
  <h3 className="title" style={style} {...props}>
    {children}
  </h3>
);

const Button = ({ children, style = {}, ...props }) => (
  <button className="button" style={style} {...props}>
    {children}
  </button>
);

export { Item, Hoverr, Title, HoverText, Button, Text, ItemSmall };
