import React from 'react';
import { useFormik } from 'formik';
import styled from '@emotion/styled';
import Button from './Button';

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  & > *+* { margin-top: 20px; }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  & > *+* { margin-top: 10px; }
`;

const Fieldset = styled.fieldset`
  padding: 20px;
`;

const FieldsetItems = styled.div`
  display: flex;
  flex-direction: column;
  & > *+* { margin-top: 10px; }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  & > *+* { margin-left: 5px; }
`;

const Comment = styled.div`
  font-size: small;
  color: #aaa;
  margin-top: 5px;
`;

const FieldError = styled.div`
  color: red;
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
      pleuraverdickung: false,
      blines1: false,
      blines2: false,
      subpkons: false,
      aerobronch: false,
      alines: false,
      lusscore: undefined,
    },
    validate: values => {
      const { lusscore } = values;
      const errors: any = {};
      if (lusscore == null) {
        errors.lusscore = 'Sie müssen einen Score auswählen';
      } else if (lusscore! > 0) {
        errors.lusscore = 'Bei LUS-Score >0 sollte es auch Pathologien geben';
      }
      return errors;
    },
    onSubmit: values => {
      props.onSubmit(values);
    },
  });
  console.log(formik)
  return (
    <Outer>
      <StyledForm onSubmit={formik.handleSubmit}>
        <Fieldset>
          <legend>Pathologien</legend>
          <FieldsetItems>
            <FormRow>
              <input
                disabled={disabled}
                id="pleuraverdickung"
                name="pleuraverdickung"
                type="checkbox"
                onChange={formik.handleChange}
                value={`${formik.values.pleuraverdickung}`}
              />
              <label htmlFor="pleuraverdickung">Pleuraverdickung/ Pleurafragmentierung</label>
            </FormRow>
            <FormRow>
              <input
                disabled={disabled}
                id="blines1"
                name="blines1"
                type="checkbox"
                onChange={formik.handleChange}
                value={`${formik.values.blines1}`}
              />
              <label htmlFor="blines1">B-Lines vereinzelnd &lt; 4 Lines</label>
            </FormRow>
            <FormRow>
              <input
                disabled={disabled}
                id="blines2"
                name="blines2"
                type="checkbox"
                onChange={formik.handleChange}
                value={`${formik.values.blines2}`}
              />
              <label htmlFor="blines2">B-Lines konfluierend</label>
            </FormRow>
            <FormRow>
              <input
                disabled={disabled}
                id="subpkons"
                name="subpkons"
                type="checkbox"
                onChange={formik.handleChange}
                value={`${formik.values.subpkons}`}
              />
              <label htmlFor="subpkons">Subpleurale Konsolidierung</label>
            </FormRow>
            <FormRow>
              <input
                disabled={disabled}
                id="aerobronch"
                name="aerobronch"
                type="checkbox"
                onChange={formik.handleChange}
                value={`${formik.values.aerobronch}`}
              />
              <label htmlFor="aerobronch">Aerobronchogramm</label>
            </FormRow>
          </FieldsetItems>
        </Fieldset>

        <Fieldset>
          <legend>LUS-Score</legend>
          <FieldsetItems>
            {formik.touched.lusscore && formik.errors.lusscore &&
              <FieldError>{formik.errors.lusscore}</FieldError>
            }
            <FormRow>
              <input
                disabled={disabled}
                id="lusscore-0"
                name="lusscore"
                type="radio"
                onChange={formik.handleChange}
                value="0"
              />
              <label htmlFor="lusscore-0">
                0: Normal aeration
                <Comment>A-lines, no more than 2 B-lines</Comment>
              </label>
            </FormRow>
            <FormRow>
              <input
                disabled={disabled}
                id="lusscore-1"
                name="lusscore"
                type="radio"
                onChange={formik.handleChange}
                value="1"
              />
              <label htmlFor="lusscore-1">
                1: Moderate loss of aeration
                <Comment>
                  Multiple B-lines,
                  regularly spaced (>7mm apart) or coalescent but only limited part of ICS
                </Comment>
              </label>
            </FormRow>
            <FormRow>
              <input
                disabled={disabled}
                id="lusscore-2"
                name="lusscore"
                type="radio"
                onChange={formik.handleChange}
                value="2"
              />
              <label htmlFor="lusscore-2">
                2: Severe loss of aeration
                <Comment>
                  Multiple coalescent B-lines, in prevalent areas of the ICS and observed in one or several ICS
                </Comment>
              </label>
            </FormRow>
            <FormRow>
              <input
                disabled={disabled}
                id="lusscore-3"
                name="lusscore"
                type="radio"
                onChange={formik.handleChange}
                value="3"
              />
              <label htmlFor="lusscore-3">
                3: Complete loss of aeration
                <Comment>
                Subpleurale Konsolidierung
                </Comment>
              </label>
            </FormRow>
          </FieldsetItems>
        </Fieldset>


      </StyledForm>
      <FormRow>
        <Button
          disabled={props.disabled}
          large={true}
          onClick={props.disabled ? undefined : () => formik.submitForm()}
        >Abschicken</Button>
      </FormRow>
    </Outer>
  );
};

export default GradingForm;
