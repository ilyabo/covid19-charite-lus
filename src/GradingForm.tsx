import React from 'react';
import { useFormik } from 'formik';
import styled from '@emotion/styled';
import Button from './Button';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  & > *+* { margin-top: 20px; }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  & > *+* { margin-left: 5px; }
`;

export type GradingFormValues = any;

const GradingForm: React.FC<
  {
    disabled?: boolean;
    onSubmit: (values: GradingFormValues) => void;
  }
> = (props) => {
  const { disabled } = props;
  const formik = useFormik({
    initialValues: {
      pleuraverdickung: undefined,
      blines: undefined,
    },
    onSubmit: values => {
      props.onSubmit(values);
    },
  });
  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <FormRow>
        <input
          disabled={disabled}
          id="pleuraverdickung"
          name="pleuraverdickung"
          type="checkbox"
          onChange={formik.handleChange}
          value={formik.values.pleuraverdickung}
        />
        <label htmlFor="pleuraverdickung">Pleuraverdickung/ Pleurafragmentierung</label>
      </FormRow>
      <FormRow>
        <input
          disabled={disabled}
          id="blines"
          name="blines"
          type="checkbox"
          onChange={formik.handleChange}
          value={formik.values.blines}
        />
        <label htmlFor="blines">B-Lines vereinzelnd &lt; 4 Lines</label>
      </FormRow>
      <FormRow>
        <Button
          disabled={props.disabled}
          large={true}
          onClick={props.disabled ? undefined : () => formik.submitForm()}
        >Abschicken</Button>
      </FormRow>
    </StyledForm>
  );
};

export default GradingForm;
