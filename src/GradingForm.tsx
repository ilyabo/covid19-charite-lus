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

const GradingForm = () => {
  const formik = useFormik({
    initialValues: {
      pleuraverdickung: undefined,
      blines: undefined,
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <FormRow>
        <input
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
          id="blines"
          name="blines"
          type="checkbox"
          onChange={formik.handleChange}
          value={formik.values.blines}
        />
        <label htmlFor="blines">B-Lines vereinzelnd &lt; 4 Lines</label>
      </FormRow>
      <FormRow>
        <Button large>Abschicken</Button>
      </FormRow>
    </StyledForm>
  );
};

export default GradingForm;
