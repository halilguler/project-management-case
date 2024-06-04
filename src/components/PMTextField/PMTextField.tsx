import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
type Props = {
  as: typeof Col | typeof Row;
  controlId: string;
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
};

const PMTextField = (props: Props) => {
  const {
    as,
    controlId,
    label,
    placeholder,
    type,
    value,
    onChange,
    className,
    required,
    disabled,
    readOnly,
  } = props;
  return (
    <Form.Group as={as} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
      />
    </Form.Group>
  );
};

export default PMTextField;
