import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import "./style.css";
type PMTextFieldProps = {
  as: typeof Col | typeof Row;
  controlId: string;
  label?: string;
  placeholder?: string;
  type: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
};

const PMTextField = (props: PMTextFieldProps) => {
  const {
    as,
    controlId,
    label,
    placeholder,
    type,
    name,
    value,
    onChange,
    onKeyDown,
    onBlur,
    className,
    required,
    disabled,
    readOnly,
  } = props;
  return (
    <Form.Group as={as} controlId={controlId}>
      {label && <Form.Label className="form_label">{label}</Form.Label>}
      <Form.Control
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className={className}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
      />
    </Form.Group>
  );
};

export default PMTextField;
