import { Button } from "react-bootstrap";

type Props = {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "link"
    | "outline-primary"
    | "outline-secondary"
    | "outline-success"
    | "outline-danger"
    | "outline-warning"
    | "outline-info"
    | "outline-light"
    | "outline-dark"
    | undefined;
  text: string;
  onClick: () => void;
  className?: string;
};

const PMButton = (props: Props) => {
  const { variant, text, onClick, className } = props;
  return (
    <Button variant={variant} onClick={onClick} className={className}>
      {text}
    </Button>
  );
};

export default PMButton;
