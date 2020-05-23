import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import styled from '@emotion/styled';
import Button from './Button';
import { errorColor } from './colors';
import { useAsyncFn } from 'react-use';
import fetchApi from './fetchApi';
import { useIdentityContext } from 'react-netlify-identity';
import Spinner from './Spinner';

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
  align-items: center;
  & > *+* { margin-left: 10px; }
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
  'ErfahrungJahre',
  'ErfahrungArzt',
  'Fachrichtung',
  'ErfahrungSonoJahre',
  'Sonographien',
  'LUS_insgesamt',
  'LUS_COVID19',
  'LUS_COVID19_Anzahl',
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

  useEffect(() => {
    if (!submitState.loading && submitState?.value?.status === 'ok') {
      document.location.href = '/next-video';
    }
  }, [submitState])

  const formik = useFormik({
    initialValues: {
      ErfahrungJahre: '',
      ErfahrungArzt: null,
      Fachrichtung: null,
      ErfahrungSonoJahre: '',
      Sonographien: null,
      LUS_insgesamt: null,
      LUS_COVID19: null,
      LUS_COVID19_Anzahl: '',
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
      validateNumber('LUS_COVID19_Anzahl', 0, 1000);


      return errors;
    },
    onSubmit: values => {
      submitFetch(values);
    },
  });
  const disabled = submitState.loading;
  return (
    <Outer>
      <h1>Fragebogen</h1>
      <div>Bitte, beantworten Sie zuerst die folgenden Fragen:</div>
      <StyledForm onSubmit={formik.handleSubmit}>
        <Fieldset>
          <legend>Klinische Erfahrung</legend>
          <FieldsetItems>
            <FormRow>
              <FormItem error={!!(formik.touched.ErfahrungJahre && formik.errors.ErfahrungJahre)}>
                <input
                  id="ErfahrungJahre"
                  name="ErfahrungJahre"
                  type="text"
                  onChange={formik.handleChange}
                  disabled={disabled}
                  value={formik.values.ErfahrungJahre}
                  style={{ width: 30, fontSize: '15px' }}
                />
                <label>Jahre</label>
              </FormItem>
            </FormRow>
            <FormRow>
              <FormItem error={!!(formik.touched.ErfahrungArzt && formik.errors.ErfahrungArzt)}>
                <RadioItem>
                  <input
                    id="assistenzarzt"
                    name="ErfahrungArzt"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value="Assistenzarzt"
                    checked={formik.values.ErfahrungArzt === 'Assistenzarzt'}
                  />
                  <label htmlFor="assistenzarzt">Assistenzarzt</label>
                </RadioItem>
                <RadioItem>
                  <input
                    id="facharzt"
                    name="ErfahrungArzt"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value="Facharzt"
                    checked={formik.values.ErfahrungArzt === 'Facharzt'}
                  />
                  <label htmlFor="facharzt">Facharzt</label>
                </RadioItem>
                <RadioItem>
                  <input
                    id="Prä-Kliniker"
                    name="ErfahrungArzt"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value="Prä-Kliniker"
                    checked={formik.values.ErfahrungArzt === 'Prä-Kliniker'}
                  />
                  <label htmlFor="Prä-Kliniker">Prä-Kliniker</label>
                </RadioItem>
              </FormItem>
            </FormRow>
            {formik.touched.ErfahrungJahre && formik.errors.ErfahrungJahre &&
              <FieldError>{formik.errors.ErfahrungJahre}</FieldError>
            }
            {formik.touched.ErfahrungArzt && formik.errors.ErfahrungArzt &&
              <FieldError>{formik.errors.ErfahrungArzt}</FieldError>
            }
          </FieldsetItems>
        </Fieldset>


        <Fieldset>
          <legend>Fachrichtung</legend>
          <FieldsetItems>
            <FormRow>
              <FormItem error={!!(formik.touched.Fachrichtung && formik.errors.Fachrichtung)}>
                <RadioItem>
                  <input
                    id="Intensivmedizin"
                    name="Fachrichtung"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value="Intensivmedizin"
                    checked={formik.values.Fachrichtung === 'Intensivmedizin'}
                  />
                  <label htmlFor="Intensivmedizin">Intensivmedizin</label>
                </RadioItem>
                <RadioItem>
                  <input
                    id="Notfallmedizin"
                    name="Fachrichtung"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value="Notfallmedizin"
                    checked={formik.values.Fachrichtung === 'Notfallmedizin'}
                  />
                  <label htmlFor="Notfallmedizin">Notfallmedizin</label>
                </RadioItem>
                <RadioItem>
                  <input
                    id="Forschung"
                    name="Fachrichtung"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value="Forschung"
                    checked={formik.values.Fachrichtung === 'Forschung'}
                  />
                  <label htmlFor="Forschung">Forschung</label>
                </RadioItem>
              </FormItem>
            </FormRow>
            {formik.touched.Fachrichtung && formik.errors.Fachrichtung &&
              <FieldError>{formik.errors.Fachrichtung}</FieldError>
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
          <legend>Sonographien insgesamt (inkl. TTE)</legend>
          <FieldsetItems>
            <FormRow>
              <FormItem error={!!(formik.touched.Sonographien && formik.errors.Sonographien)}>
                <RadioItem>
                  <input
                    id="Sonographien_1000"
                    name="Sonographien"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value=">1000"
                    checked={formik.values.Sonographien === '>1000'}
                  />
                  <label htmlFor="Sonographien_1000">&gt; 1000</label>
                </RadioItem>
                <RadioItem>
                  <input
                    id="Sonographien_5000"
                    name="Sonographien"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value=">5000"
                    checked={formik.values.Sonographien === '>5000'}
                  />
                  <label htmlFor="Sonographien_5000">&gt; 5000</label>
                </RadioItem>
                <RadioItem>
                  <input
                    id="Sonographien_10000"
                    name="Sonographien"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value=">10000"
                    checked={formik.values.Sonographien === '>10000'}
                  />
                  <label htmlFor="Sonographien_10000">&gt; 10000</label>
                </RadioItem>
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


        <Fieldset>
          <legend>Lung ultrasound insgesamt</legend>
          <FieldsetItems>
            <FormRow>
              <FormItem error={!!(formik.touched.LUS_insgesamt && formik.errors.LUS_insgesamt)}>
                <RadioItem>
                  <input
                    id="lus_insgesamt_100"
                    name="LUS_insgesamt"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value=">100"
                    checked={formik.values.LUS_insgesamt === '>100'}
                  />
                  <label htmlFor="lus_insgesamt_100">&gt; 100</label>
                </RadioItem>
                <RadioItem>
                  <input
                    id="lus_insgesamt_500"
                    name="LUS_insgesamt"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value=">500"
                    checked={formik.values.LUS_insgesamt === '>500'}
                  />
                  <label htmlFor="lus_insgesamt_500">&gt; 500</label>
                </RadioItem>
                <RadioItem>
                  <input
                    id="lus_insgesamt_1000"
                    name="LUS_insgesamt"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value=">1000"
                    checked={formik.values.LUS_insgesamt === '>1000'}
                  />
                  <label htmlFor="lus_insgesamt_1000">&gt; 1000</label>
                </RadioItem>
                <RadioItem>
                  <input
                    id="lus_insgesamt_unzutreffend"
                    name="LUS_insgesamt"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value="unzutreffend"
                    checked={formik.values.LUS_insgesamt === 'unzutreffend'}
                  />
                  <label htmlFor="lus_insgesamt_unzutreffend">unzutreffend</label>
                </RadioItem>
              </FormItem>
            </FormRow>
            {formik.touched.LUS_insgesamt && formik.errors.LUS_insgesamt &&
              <FieldError>{formik.errors.LUS_insgesamt}</FieldError>
            }
          </FieldsetItems>
        </Fieldset>


        <Fieldset>
          <legend>LUS bei Covid19</legend>
          <FieldsetItems>
            <FormRow>
              <FormItem error={!!(formik.touched.LUS_COVID19 && formik.errors.LUS_COVID19)}>
                <RadioItem>
                  <input
                    id="lus_covid19_10"
                    name="LUS_COVID19"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value=">10"
                    checked={formik.values.LUS_COVID19 === '>10'}
                  />
                  <label htmlFor="lus_covid19_10">&gt; 10</label>
                </RadioItem>
                <RadioItem>
                  <input
                    id="lus_covid19_100"
                    name="LUS_COVID19"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value=">100"
                    checked={formik.values.LUS_COVID19 === '>100'}
                  />
                  <label htmlFor="lus_covid19_100">&gt; 100</label>
                </RadioItem>
                <RadioItem>
                  <input
                    id="lus_covid19_300"
                    name="LUS_COVID19"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value=">300"
                    checked={formik.values.LUS_COVID19 === '>300'}
                  />
                  <label htmlFor="lus_covid19_300">&gt; 300</label>
                </RadioItem>
                <RadioItem>
                  <input
                    id="lus_covid19_unzutreffend"
                    name="LUS_COVID19"
                    type="radio"
                    disabled={disabled}
                    onChange={formik.handleChange}
                    value="unzutreffend"
                    checked={formik.values.LUS_COVID19 === 'unzutreffend'}
                  />
                  <label htmlFor="lus_covid19_unzutreffend">unzutreffend</label>
                </RadioItem>
              </FormItem>
            </FormRow>
            <FormRow>
              <FormItem error={!!(formik.touched.LUS_COVID19_Anzahl && formik.errors.LUS_COVID19_Anzahl)}>
                <label>Geschätzte Anzahl:</label>
                <input
                  disabled={disabled}
                  id="LUS_COVID19_Anzahl"
                  name="LUS_COVID19_Anzahl"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.LUS_COVID19_Anzahl}
                  style={{ width: 60, fontSize: '15px' }}
                />
              </FormItem>
            </FormRow>
            {formik.touched.LUS_COVID19 && formik.errors.LUS_COVID19 &&
              <FieldError>{formik.errors.LUS_COVID19}</FieldError>
            }
            {formik.touched.LUS_COVID19_Anzahl && formik.errors.LUS_COVID19_Anzahl &&
              <FieldError>{formik.errors.LUS_COVID19_Anzahl}</FieldError>
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
