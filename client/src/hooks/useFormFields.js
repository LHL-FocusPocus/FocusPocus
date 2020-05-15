import { useState } from "react";

export default function useFormFields(initialState) {
  const [fields, setFields] = useState(initialState);

  return [
    fields,
    event => {
      setFields({
        ...fields,
        [event.target.id]: event.target.value,
      });
    },
  ];
}
