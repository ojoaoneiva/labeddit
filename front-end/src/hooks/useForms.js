import { useState } from "react";

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const cleanForm = () => {
    setForm(initialState);
  };

  return { form, onChange, cleanForm };
};

export default useForm;