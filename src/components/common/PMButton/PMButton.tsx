import React from "react";
import { Button } from "react-bootstrap";

type PMButtonProps = {
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
    | "outline-dark";
  children: string | React.ReactNode;
  onClick: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const PMButton = (props: PMButtonProps) => {
  const { variant, children, onClick, type, className } = props;
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={className}
      form={"taskForm"}
      type={type || "button"}
    >
      {children}
    </Button>
  );
};

export default PMButton;
