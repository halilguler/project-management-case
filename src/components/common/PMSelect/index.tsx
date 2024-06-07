import { Form } from "react-bootstrap";

type PMSelectProps = {
  options: {
    id: string;
    value: string;
  }[];
  label: string;
  name: string;
  required?: boolean;
  className?: string;
  controlId: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const PMSelect = (props: PMSelectProps) => {
  const { options, label, required, name, controlId, value, onChange } = props;
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Select
        required={required}
        name={name}
        defaultValue={value}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.id}>{option.value}</option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default PMSelect;
