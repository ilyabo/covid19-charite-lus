import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import styled from '@emotion/styled';
import Button from './Button';
import { errorColor } from './colors';
import Spinner from './Spinner';

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
  & > input { flex: 0 0 auto; }   // fixes a rendering issue in Safari
  & input:focus {
    outline: 2px solid rgba(0, 103, 244, 1.0);     
  }
`;
const SubmitRow = styled(FormRow)`
  justify-content: flex-start;          
  & > *+* { margin-left: 15px; }
`;

const HRule = styled.hr`
  width: 100%;
  margin: 10px 0 0 0;
  border-color: #999;
`;

const Comment = styled.div`
  font-size: small;
  color: #aaa;
  margin-top: 5px;
`;

const FieldError = styled.div`
  color: ${errorColor};
`;

export interface GradingFormValues {
  pat_none?: boolean;
  pat_pleuraverdickung?: boolean;
  pat_blines1?: boolean;
  pat_blines2?: boolean;
  pat_subpkons?: boolean;
  pat_aerobronch?: boolean;
  lusscore?: string;
}

const GradingForm: React.FC<
  {
    isLoading?: boolean;
    onSubmit: (values: GradingFormValues) => void;
  }
> = (props) => {
  const { isLoading } = props;
  const formik = useFormik({
    initialValues: {
      pat_none: false,
      pat_pleuraverdickung: false,
      pat_blines1: false,
      pat_blines2: false,
      pat_subpkons: false,
      pat_aerobronch: false,
      lusscore: undefined,
    },
    validate: (values: GradingFormValues) => {
      const { lusscore } = values;
      const errors: any = {};
      if (lusscore == null) {
        errors.lusscore = 'Sie müssen einen Score auswählen';
      // } else if (lusscore! > 0) {
      //   const hasPathology = Object.keys(values)
      //     .filter(k => k.startsWith('pat_'))
      //   // @ts-ignore
      //     .map((k: string) => values[k])
      //     .some(v => !!v);
      //   if (!hasPathology) {
      //     errors.lusscore = 'Bei LUS-Score >0 sollte es auch Pathologien geben';
      //   }
      }
      if (values.pat_none) {
        Object.keys(values)
          .filter(k => k.startsWith('pat_') && k !== 'pat_none')
          .forEach(k => formik.setFieldValue(k, false, false));
      } else {
        const checkedCount =
          Object.keys(values)
            .filter(k => k.startsWith('pat_') && (values as any)[k])
            .length;
        if (checkedCount === 0) {
          errors.pat_none = 'Sie müssen mindestens eine Checkbox wählen';
        }
      }
      return errors;
    },
    onSubmit: values => {
      props.onSubmit(values);
    },
  });
  const firstFieldRef = useRef<HTMLInputElement>(null );
  useEffect(() => firstFieldRef.current?.focus(), [firstFieldRef]);
  return (
    <Outer>
      <StyledForm onSubmit={formik.handleSubmit}>
        <Fieldset>
          <legend>Pathologies</legend>
          <FieldsetItems>
            {formik.touched.pat_none && formik.errors.pat_none &&
              <FieldError>{formik.errors.pat_none}</FieldError>
            }
            <FormRow>
              <input
                ref={firstFieldRef}
                disabled={isLoading}
                id="pat_none"
                name="pat_none"
                type="checkbox"
                onChange={formik.handleChange}
                checked={formik.values.pat_none}
              />
              <label htmlFor="pat_none">No pathologies</label>
            </FormRow>
            <HRule />
            <FormRow>
              <input
                disabled={formik.values.pat_none || isLoading}
                id="pat_pleuraverdickung"
                name="pat_pleuraverdickung"
                type="checkbox"
                onChange={formik.handleChange}
                checked={formik.values.pat_pleuraverdickung}
              />
              <label htmlFor="pat_pleuraverdickung">Pleural thickening / pleural fragmentation</label>
            </FormRow>
            <FormRow>
              <input
                disabled={formik.values.pat_none || isLoading}
                id="pat_blines1"
                name="pat_blines1"
                type="checkbox"
                onChange={(evt) => {
                  formik.setFieldValue('pat_blines2', false, false);
                  formik.handleChange(evt);
                }}
                checked={formik.values.pat_blines1}
              />
              <label htmlFor="pat_blines1">B-lines isolated &lt; 4 lines</label>
            </FormRow>
            <FormRow>
              <input
                disabled={formik.values.pat_none || isLoading}
                id="pat_blines2"
                name="pat_blines2"
                type="checkbox"
                onChange={(evt) => {
                  formik.setFieldValue('pat_blines1', false, false);
                  formik.handleChange(evt);
                }}
                checked={formik.values.pat_blines2}
              />
              <label htmlFor="pat_blines2">B-lines coalescent / &gt; 4 lines</label>
            </FormRow>
            <FormRow>
              <input
                disabled={formik.values.pat_none || isLoading}
                id="pat_subpkons"
                name="pat_subpkons"
                type="checkbox"
                onChange={formik.handleChange}
                checked={formik.values.pat_subpkons}
              />
              <label htmlFor="pat_subpkons">Subpleural consolidations</label>
            </FormRow>
            <FormRow>
              <input
                disabled={formik.values.pat_none || isLoading}
                id="pat_aerobronch"
                name="pat_aerobronch"
                type="checkbox"
                onChange={formik.handleChange}
                checked={formik.values.pat_aerobronch}
              />
              <label htmlFor="pat_aerobronch">Air bronchogram</label>
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
                disabled={isLoading}
                id="lusscore-0"
                name="lusscore"
                type="radio"
                onChange={formik.handleChange}
                value="0"
                checked={formik.values.lusscore === '0'}
              />
              <label htmlFor="lusscore-0">
                0: Normal aeration
                <Comment>A-lines, no more than 2 B-lines</Comment>
              </label>
            </FormRow>
            <FormRow>
              <input
                disabled={isLoading}
                id="lusscore-1"
                name="lusscore"
                type="radio"
                onChange={formik.handleChange}
                value="1"
                checked={formik.values.lusscore === '1'}
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
                disabled={isLoading}
                id="lusscore-2"
                name="lusscore"
                type="radio"
                onChange={formik.handleChange}
                value="2"
                checked={formik.values.lusscore === '2'}
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
                disabled={isLoading}
                id="lusscore-3"
                name="lusscore"
                type="radio"
                onChange={formik.handleChange}
                value="3"
                checked={formik.values.lusscore === '3'}
              />
              <label htmlFor="lusscore-3">
                3: Complete loss of aeration
                <Comment>
                  Lung consolidation, with or without air bronchograms
                </Comment>
              </label>
            </FormRow>
          </FieldsetItems>
        </Fieldset>


      </StyledForm>
      <SubmitRow>
        <Button
          type="submit"
          disabled={props.isLoading}
          large={true}
          onClick={props.isLoading ? undefined : () => formik.submitForm()}
        >Submit</Button>
        {isLoading &&
          <Spinner/>
        }
      </SubmitRow>
    </Outer>
  );
};

export default GradingForm;
