import React from "react";
import { Field, ErrorMEssage } from "formik";


//When a RadioButton is defined in a component this function is called to handles the properties passed
const RadioButton = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <label>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => { //here we loop over the radio button options and assign the properties
            return (
              <React.Fragment key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
    </div>
  );
};

export default RadioButton;
