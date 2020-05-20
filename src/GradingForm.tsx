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
      pat_pleuraverdickung: false,
      pat_blines1: false,
      pat_blines2: false,
      pat_subpkons: false,
      pat_aerobronch: false,
      pat_alines: false,
      lusscore: undefined,
    },
    validate: values => {
      const { lusscore } = values;
      const errors: any = {};
      if (lusscore == null) {
        errors.lusscore = 'Sie müssen einen Score auswählen';
      } else if (lusscore! > 0) {
        const hasPathology = Object.keys(values)
          .filter(k => k.startsWith('pat_'))
        // @ts-ignore
          .map((k: string) => values[k])
          .some(v => !!v);
        if (!hasPathology) {
          errors.lusscore = 'Bei LUS-Score >0 sollte es auch Pathologien geben';
        }
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
                id="pat_pleuraverdickung"
                name="pat_pleuraverdickung"
                type="checkbox"
                onChange={formik.handleChange}
                value={`${formik.values.pat_pleuraverdickung}`}
              />
              <label htmlFor="pat_pleuraverdickung">Pleuraverdickung/ Pleurafragmentierung</label>
            </FormRow>
            <FormRow>
              <input
                disabled={disabled}
                id="pat_blines1"
                name="pat_blines1"
                type="checkbox"
                onChange={formik.handleChange}
                value={`${formik.values.pat_blines1}`}
              />
              <label htmlFor="pat_blines1">B-Lines vereinzelnd &lt; 4 Lines</label>
            </FormRow>
            <FormRow>
              <input
                disabled={disabled}
                id="pat_blines2"
                name="pat_blines2"
                type="checkbox"
                onChange={formik.handleChange}
                value={`${formik.values.pat_blines2}`}
              />
              <label htmlFor="pat_blines2">B-Lines konfluierend</label>
            </FormRow>
            <FormRow>
              <input
                disabled={disabled}
                id="pat_subpkons"
                name="pat_subpkons"
                type="checkbox"
                onChange={formik.handleChange}
                value={`${formik.values.pat_subpkons}`}
              />
              <label htmlFor="pat_subpkons">Subpleurale Konsolidierung</label>
            </FormRow>
            <FormRow>
              <input
                disabled={disabled}
                id="pat_aerobronch"
                name="pat_aerobronch"
                type="checkbox"
                onChange={formik.handleChange}
                value={`${formik.values.pat_aerobronch}`}
              />
              <label htmlFor="pat_aerobronch">Aerobronchogramm</label>
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
