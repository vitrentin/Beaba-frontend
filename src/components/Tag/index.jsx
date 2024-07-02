import { Container } from "./styles";
import { RiCloseFill } from "react-icons/ri";
// eslint-disable-next-line react/prop-types
export function Tag({ children, onRemove, ...rest }) {
  return (
    <Container {...rest}>
      {children}
      <button onClick={onRemove}>
        <RiCloseFill size={16} />
      </button>
    </Container>
  );
}
