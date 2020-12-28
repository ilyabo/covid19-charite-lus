import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import styled from '@emotion/styled';
import Button from './Button';
import { errorColor } from './colors';
import { useAsyncFn } from 'react-use';
import fetchApi from './fetchApi';
import { useIdentityContext } from 'react-netlify-identity';
import Spinner from './Spinner';
import { useHistory } from 'react-router-dom';

const Outer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  // height: 100%;
  padding-top: 60px;
  padding-bottom: 100px;
  flex-direction: column;
  & > * { max-width: 700px; }
  & > *+* { margin-top: 40px; }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  & > *+* { margin-top: 20px; }
`;

const Fieldset = styled.fieldset`
  display: flex;
  padding: 20px;
  flex-grow: 1;
`;

const FieldsetItems = styled.div`
  display: flex;
  flex-direction: column;
  & > *+* { margin-top: 20px; }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  line-height: 2em;
  & > *+* { margin-left: 30px; }
  & input:focus {
    outline: 2px solid rgba(0, 103, 244, 1.0);     
  }
`;

const FormItem = styled.div<{ error?: boolean }>(({ error }) => `
  display: flex;
  flex-direction: row;
  & > *+* { margin-left: 10px; }
  ${error 
  ? `
    border: 2px solid ${errorColor};
    border-radius: 4px;
    padding: 5px;
  `
  : ''}
`);

const FormItemCol = styled.div<{ error?: boolean }>(({ error }) => `
  display: flex;
  flex-direction: column;
  & > *+* { margin-top: 10px; }
  ${error 
  ? `
    border: 2px solid ${errorColor};
    border-radius: 4px;
    padding: 5px;
  `
  : ''}
`);

const RadioItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > *+* { margin-left: 5px; }
`;


const fieldNames = [
  'Institution',
  'TaetigkeitArt',
  'TaetigkeitJahre',
  'ErfahrungSonoJahre',
  'Sonographien',
];

const FieldError = styled.div`
  color: ${errorColor};
`;
const SmallError = styled.div`
  color: ${errorColor};
  max-width: 300px;
  margin-top: 20px;
`;


const Questionnaire: React.FC<{}> = (props) => {
  const { user } = useIdentityContext();
  const [submitState, submitFetch] = useAsyncFn(async (values: any) => {
    return await fetchApi('questionnaire-submit', user, {
      method: 'POST',
      body: JSON.stringify({
        values
      }),
    });
  }, []);

  const history = useHistory();

  useEffect(() => {
    if (!submitState.loading && submitState?.value?.status === 'ok') {
      history.push('/training');
    }
  }, [submitState, history])

  const formik = useFormik({
    initialValues: {
      Institution: '',
      TaetigkeitArt: '',
      TaetigkeitJahre: '',
      ErfahrungSonoJahre: '',
      Sonographien: '',
      MoeglichkeitAbzubrechen: null,
      Einverstanden: null,
      KeineLusErfahrung: null,
      KeineHilfsmittel: null,
    },
    validate: (values: any) => {
      const errors: any = {};
      for (const field of fieldNames) {
        const v = values[field];
        if (v == null || !(`${v}`.trim().length > 0)) {
          errors[field] = `“${field}” ist ein Pflichtfeld`;
        }
      }

      const validateNumber = (field: string, min: number, max: number) => {
        const v = values[field];
        if (v?.trim().length > 0) {
          const numValue = +v;
          if (!(min <= numValue && numValue <= max)) {
            errors[field] = `“${field}” sollte zwischen ${min} und ${max} sein`;
          }
        }
      };
      validateNumber('ErfahrungJahre', 0, 99);
      validateNumber('ErfahrungSonoJahre', 0, 99);
      // validateNumber('LUS_COVID19_Anzahl', 0, 1000);

      if (!values.MoeglichkeitAbzubrechen?.includes('on')) errors.MoeglichkeitAbzubrechen = true;
      if (!values.Einverstanden?.includes('on')) errors.Einverstanden = true;
      if (!values.KeineLusErfahrung?.includes('on')) errors.KeineLusErfahrung = true;
      if (!values.KeineHilfsmittel?.includes('on')) errors.KeineHilfsmittel = true;

      return errors;
    },
    onSubmit: values => {
      submitFetch(values);
    },
  });
  const disabled = submitState.loading;
  return (
    <Outer>
      <StyledForm onSubmit={formik.handleSubmit}>
      <h1>Studienteilnahme</h1>

        <FormRow>
          <FormItem error={formik.touched.Einverstanden && !!formik.errors.Einverstanden}>
            <input id="Einverstanden" name="Einverstanden" type="checkbox"
                   onChange={formik.handleChange}
            />
            <label htmlFor="Einverstanden"  style={{lineHeight: 1.2}}>Ich erkläre mich damit einverstanden, an der Studie teilzunehmen. Meine Teilnahme erfolgt freiwillig.</label>
          </FormItem>
        </FormRow>
        <FormRow>
          <FormItem error={formik.touched.MoeglichkeitAbzubrechen && !!formik.errors.MoeglichkeitAbzubrechen}>
            <input id="MoeglichkeitAbzubrechen" name="MoeglichkeitAbzubrechen" type="checkbox"
                   onChange={formik.handleChange}/>
            <label htmlFor="MoeglichkeitAbzubrechen" style={{lineHeight: 1.2}}>
              Ich weiß, dass ich die Möglichkeit habe, meine Teilnahme an dieser Studie jederzeit und ohne Angabe
              von Gründen abzubrechen, ohne dass mir daraus Nachteile entstehen. Ich erkläre, dass ich mit der im
              Rahmen der Studie erfolgenden Aufzeichnung von Studiendaten und ihrer Verwendung in pseudo- bzw.
              anonymisierter Form einverstanden bin.
            </label>
          </FormItem>
        </FormRow>
        <FormRow>
          <FormItem error={formik.touched.KeineLusErfahrung && !!formik.errors.KeineLusErfahrung}>
            <input id="KeineLusErfahrung" name="KeineLusErfahrung" type="checkbox"
                   onChange={formik.handleChange}
            />
            <label htmlFor="KeineLusErfahrung" style={{lineHeight: 1.2}}>Ich versichere, dass ich keine Vor-Erfahrungen mit Lungenultraschall habe.</label>
          </FormItem>
        </FormRow>
        <FormRow>
          <FormItem error={formik.touched.KeineHilfsmittel && !!formik.errors.KeineHilfsmittel}>
            <input id="KeineHilfsmittel" name="KeineHilfsmittel" type="checkbox"
                   onChange={formik.handleChange}/>
            <label htmlFor="KeineHilfsmittel" style={{lineHeight: 1.2}}>
              Ich versichere, dass ich keine zusätzlichen Hilfsmittel (als die hier im Tool angebotenen) für die Auswertung anwenden werde.
              (kein Youtube, kein Buch, etc.)
            </label>
          </FormItem>
        </FormRow>

        <br/><br/>

        <h1>Fragebogen</h1>
        {/*<div>Bitte, beantworten Sie zuerst die folgenden Fragen:</div>*/}

        <Fieldset>
          <legend>Tätigkeit im medizinischen Bereich</legend>
          <FieldsetItems>
            <FormItemCol error={!!(formik.touched.Institution && formik.errors.Institution)}>
              <label>Institution</label>
              <input
                id="Institution"
                name=""
                type="text"
                onChange={formik.handleChange}
                disabled={disabled}
                value={formik.values.Institution}
                style={{ width: 500, fontSize: '15px' }}
              />
            </FormItemCol>
            {formik.touched.Institution && formik.errors.Institution &&
              <FieldError>{formik.errors.Institution}</FieldError>
            }
            <FormItemCol error={!!(formik.touched.TaetigkeitArt && formik.errors.TaetigkeitArt)}>
              <label>Art der Tätigkeit (e.g. Arzt, Tutor Sono, PJ-Student, etc.)</label>
              <input
                id="TaetigkeitArt"
                name=""
                type="text"
                onChange={formik.handleChange}
                disabled={disabled}
                value={formik.values.TaetigkeitArt}
                style={{ width: 500, fontSize: '15px' }}
              />
            </FormItemCol>
            {formik.touched.TaetigkeitArt && formik.errors.TaetigkeitArt &&
              <FieldError>{formik.errors.TaetigkeitArt}</FieldError>
            }
            <FormRow>
              <FormItem error={!!(formik.touched.TaetigkeitJahre && formik.errors.TaetigkeitJahre)}>
                <label>Dauer der Tätigkeit</label>
                <input
                  id="TaetigkeitJahre"
                  name="TaetigkeitJahre"
                  type="text"
                  disabled={disabled}
                  onChange={formik.handleChange}
                  value={formik.values.TaetigkeitJahre}
                  style={{ width: 30, fontSize: '15px' }}
                />
                <label>Jahre</label>
              </FormItem>
            </FormRow>
            {formik.touched.TaetigkeitJahre && formik.errors.TaetigkeitJahre &&
              <FieldError>{formik.errors.TaetigkeitJahre}</FieldError>
            }
          </FieldsetItems>
        </Fieldset>

        <Fieldset>
          <legend>Erfahrung Sonographie</legend>
          <FieldsetItems>
            <FormRow>
              <FormItem error={!!(formik.touched.ErfahrungSonoJahre && formik.errors.ErfahrungSonoJahre)}>
                <input
                  id="ErfahrungSonoJahre"
                  name="ErfahrungSonoJahre"
                  type="text"
                  disabled={disabled}
                  onChange={formik.handleChange}
                  value={formik.values.ErfahrungSonoJahre}
                  style={{ width: 30, fontSize: '15px' }}
                />
                <label>Jahre</label>
              </FormItem>
            </FormRow>
            {formik.touched.ErfahrungSonoJahre && formik.errors.ErfahrungSonoJahre &&
              <FieldError>{formik.errors.ErfahrungSonoJahre}</FieldError>
            }
          </FieldsetItems>
        </Fieldset>


        <Fieldset>
          <legend>Sonographien insgesamt</legend>
          <FieldsetItems>
            <FormRow>
              <FormItem error={!!(formik.touched.Sonographien && formik.errors.Sonographien)}>

                { [100,1000,5000].map(num =>
                  <RadioItem
                    key={num}
                  >
                    <input
                      id={`Sonographien_${num}`}
                      name="Sonographien"
                      type="radio"
                      disabled={disabled}
                      onChange={formik.handleChange}
                      value={`>${num}`}
                      checked={formik.values.Sonographien === `>${num}`}
                    />
                    <label htmlFor={`Sonographien_${num}`}>&gt; {num}</label>
                  </RadioItem>)
                }
                <RadioItem>
                  <input
                    id="Sonographien_unzutreffend"
                    name="Sonographien"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value="unzutreffend"
                    checked={formik.values.Sonographien === 'unzutreffend'}
                  />
                  <label htmlFor="Sonographien_unzutreffend">unzutreffend</label>
                </RadioItem>
              </FormItem>
            </FormRow>
            {formik.touched.Sonographien && formik.errors.Sonographien &&
              <FieldError>{formik.errors.Sonographien}</FieldError>
            }
          </FieldsetItems>
        </Fieldset>




        { Object.keys(formik.touched).length > 0 &&
          Object.keys(formik.errors).length > 0 &&
          <FieldError>Bitte, korrigieren Sie die Fehler oben im Formular.</FieldError>
        }
      </StyledForm>


      <FormRow>
        <Button
          type="submit"
          disabled={disabled}
          large={true}
          onClick={disabled ? undefined : () => formik.submitForm()}
        >Weiter &gt;&gt;</Button>
        {submitState.loading &&
          <Spinner/>
        }
        {!submitState.loading && submitState.error &&
          <SmallError>Oops… Etwas ist schief gelaufen. Versuchen Sie es bitte nochmals.</SmallError>
        }
      </FormRow>
    </Outer>
  );
};

export default Questionnaire;
