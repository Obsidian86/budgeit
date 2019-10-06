import React, { useState, useEffect } from "react";

const Form = ({ render, defaultFormData = {} }) => {
  const [formData, updateFormData] = useState(defaultFormData);
  useEffect(() => {
    updateFormData(defaultFormData);
  }, [defaultFormData]);
  const updateField = e =>
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  return <>{render(updateField, formData)}</>;
};

export default Form;
