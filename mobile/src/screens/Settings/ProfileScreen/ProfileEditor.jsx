import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { AutoComplete, HelperText, TextInput } from '../../../components';

const StyledTextInput = styled(TextInput)`
  background: #fff;
`;

const addPhoneMask = (value) => {
  let r = value ? value.replace(/\D/g, '') : '';
  r = r.replace(/^0/, '');
  if (r.length > 10) {
    // 11+ digits. Format as 5+4.
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else if (r.length > 5) {
    // 6..10 digits. Format as 4+4
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  }
  return r;
};

const removePhoneMask = (value) => {
  let r = value ? value.replace(/ /g, '') : '';
  r = r.replace(/[^\w\s]/gi, '');
  return r;
};

const ProfileEditor = ({
  initialValues,
  emailInputEnabled,
  showPasswordInput,
  showEmailInput,
  onUpdateDataPress,
  renderSubmit,
  scrollContainer,
  enableContainerScroll,
  isScrollInContainerEnabled,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const preferredNameRef = useRef();
  const emailRef = useRef();
  const companyRef = useRef();
  const phoneRef = useRef();
  const countryRef = useRef();
  const stateRef = useRef();
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const {
    name,
    preferredName,
    email,
    company,
    phone,
    country,
    state,
  } = initialValues;
  const { t } = useTranslation();
  const { countries, countriesValues, states, statesValues } = useMemo(() => {
    const countriesEntries = t('countries:world', { returnObjects: true });
    const countriesEntriesValues = Object.values(countriesEntries);
    const statesEntries = {
      Brazil: t('states:Brazil', { returnObjects: true }),
    };
    const statesEntriesValues = {
      Brazil: Object.values(statesEntries.Brazil),
    };
    return {
      countries: countriesEntries,
      countriesValues: countriesEntriesValues.map((item) => item.name),
      states: statesEntries,
      statesValues: statesEntriesValues,
    };
  }, [t]);

  const userSchema = yup.object().shape({
    name: yup
      .string()
      .required(t('name-is-required'))
      .matches(/^([^0-9]*)$/, t('name-cannot-contain-numbers')),
    preferredName: yup
      .string()
      .max(20, t('preferred-name-length-must-be-less-than'))
      .required(t('preferred-name-is-required'))
      .matches(/^([^0-9]*)$/, t('preferred-name-cannot-contain-numbers')),
    ...(showEmailInput && {
      email: yup
        .string()
        .email(t('email-must-be-a-valid-email'))
        .required(t('email-is-required')),
    }),
    company: yup.string(),
    phone: yup
      .string()
      .matches(
        /(\(\d{2,}\) \d{4,5}-\d{4})|(\d{10,11})/g,
        t('phone-number-is-invalid')
      ),
    country: yup
      .string()
      .oneOf(countriesValues, t('not-a-valid-country'))
      .required(t('country-is-required')),
    state: yup.string().when('country', {
      is: (value) => value === countries.Brazil.name,
      then: yup
        .string()
        .required(t('state-is-required'))
        .oneOf(statesValues.Brazil, t('state-is-not-valid')),
    }),
    ...(showPasswordInput && {
      password: yup
        .string()
        .min(6, t('your-password-must-be-at-least-6-digits'))
        .required(t('password-is-required')),
      confirmPassword: yup
        .string()
        .required(t('please-confirm-your-password'))
        .oneOf([yup.ref('password')], t('passwords-must-match')),
    }),
  });

  const [scrollToHeight, setScrollToHeight] = useState(-1);

  useEffect(() => {
    if (!isScrollInContainerEnabled && scrollToHeight !== -1) {
      scrollContainer.scrollTo({ y: scrollToHeight, animated: true });
      setScrollToHeight(-1);
      enableContainerScroll(true);
    }
  }, [
    scrollToHeight,
    isScrollInContainerEnabled,
    scrollContainer,
    enableContainerScroll,
  ]);

  const handleAutoCompleteFieldOnLayout = ({ nativeEvent }) => {
    const { y } = nativeEvent.layout;
    if (!isScrollInContainerEnabled) {
      setScrollToHeight(y);
    }
  };

  const onSubmitCountry = (values) => {
    return values.country
      ? Object.entries(countries).find(
          (value) => value[1].name === values.country
        )[0]
      : undefined;
  };

  const getCountryIddValue = (countryName) => {
    const result = Object.entries(countries).find(
      (item) => item[1].name === countryName
    );
    return result ? `+${result[1].idd}` : '';
  };

  const onSubmitState = (values) => {
    if (values.country === countries.Brazil.name) {
      if (!values.state) return undefined;

      return Object.entries(states.Brazil).find(
        ([, value]) => value === values.state
      )[0];
    }

    return values.state;
  };

  const getInitialStateValue = () =>
    country === 'Brazil'
      ? Object.entries(states.Brazil).find(
          ([initials]) => initials === state
        )[1]
      : state;

  const getInitialPhone = () => {
    if (!phone) return '';

    if (countries[country] && countries[country].idd !== '') {
      const phoneWithoutCountryCode = phone.split(
        `+${countries[country].idd}`
      )[1];

      return addPhoneMask(phoneWithoutCountryCode);
    }

    return addPhoneMask(phone);
  };

  return (
    <Formik
      initialValues={{
        name,
        preferredName,
        email,
        company,
        phone: getInitialPhone(),
        country: countries[country] ? countries[country].name : '',
        state: getInitialStateValue(),
        password: '',
        confirmPassword: '',
      }}
      validationSchema={userSchema}
      onSubmit={(values) =>
        onUpdateDataPress({
          ...values,
          phone:
            getCountryIddValue(values.country) + removePhoneMask(values.phone),
          country: onSubmitCountry(values),
          state: onSubmitState(values),
        })
      }
    >
      {(
        {
          values,
          errors,
          handleChange,
          handleSubmit,
          touched,
          setFieldTouched,
          setFieldValue,
          isValid,
        } // eslint-disable-next-line sonarjs/cognitive-complexity
      ) => (
        <>
          <StyledTextInput
            value={values.name}
            autoCapitalize="words"
            onChangeText={handleChange('name')}
            label={t('name')}
            mode="outlined"
            error={touched.name && errors.name}
            onSubmitEditing={() => preferredNameRef.current.focus()}
            returnKeyType="next"
            onBlur={() => setFieldTouched('name')}
          />
          <HelperText type="error" visible={!!(touched.name && errors.name)}>
            {errors.name}
          </HelperText>
          <StyledTextInput
            value={values.preferredName}
            ref={preferredNameRef}
            onSubmitEditing={() =>
              !emailInputEnabled
                ? companyRef.current.focus()
                : emailRef.current.focus()
            }
            autoCapitalize="words"
            onChangeText={handleChange('preferredName')}
            onBlur={() => setFieldTouched('preferredName')}
            label={t('what-name-can-we-call-you?')}
            mode="outlined"
            returnKeyType="next"
            error={touched.preferredName && errors.preferredName}
          />
          <HelperText
            type="error"
            visible={!!(touched.preferredName && errors.preferredName)}
          >
            {errors.preferredName}
          </HelperText>
          {showEmailInput && (
            <>
              <StyledTextInput
                ref={emailRef}
                onChangeText={handleChange('email')}
                value={values.email}
                label={t('email')}
                disabled={!emailInputEnabled}
                onSubmitEditing={() => companyRef.current.focus()}
                mode="outlined"
                error={touched.email && errors.email}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onBlur={() => setFieldTouched('email')}
              />
              <HelperText
                type="error"
                visible={!!(touched.email && errors.email)}
              >
                {errors.email}
              </HelperText>
            </>
          )}
          <StyledTextInput
            onChangeText={handleChange('company')}
            value={values.company}
            ref={companyRef}
            onSubmitEditing={() => countryRef.current.focus()}
            returnKeyType="next"
            label={t('company')}
            onBlur={() => setFieldTouched('company')}
            mode="outlined"
            error={touched.company && errors.company}
          />
          <HelperText
            type="error"
            visible={!!(touched.company && errors.company)}
          >
            {errors.company}
          </HelperText>
          <AutoComplete
            value={values.country}
            onChange={handleChange('country')}
            ref={countryRef}
            returnKeyType="next"
            onSubmitEditing={() => stateRef.current.focus()}
            data={countriesValues}
            label={t('country')}
            mode="outlined"
            onFocus={() => enableContainerScroll(false)}
            onBlur={() => {
              enableContainerScroll(true);
              setFieldTouched('country');
            }}
            onLayout={handleAutoCompleteFieldOnLayout}
            error={touched.country && errors.country}
          />
          <HelperText
            type="error"
            visible={!!(touched.country && errors.country)}
          >
            {errors.country}
          </HelperText>
          <AutoComplete
            value={values.state}
            onChange={handleChange('state')}
            ref={stateRef}
            returnKeyType="next"
            onSubmitEditing={() => phoneRef.current.focus()}
            data={
              values.country === countries.Brazil.name
                ? statesValues.Brazil
                : []
            }
            label={t('state')}
            mode="outlined"
            onFocus={() => enableContainerScroll(false)}
            onBlur={() => {
              enableContainerScroll(true);
              setFieldTouched('state');
            }}
            onLayout={handleAutoCompleteFieldOnLayout}
            error={touched.state && errors.state}
          />
          <HelperText type="error" visible={!!(touched.state && errors.state)}>
            {errors.state}
          </HelperText>
          <TextInput
            label={t('phone')}
            ref={phoneRef}
            mode="outlined"
            left={
              <TextInput.Affix
                text={
                  values.country
                    ? `${getCountryIddValue(values.country)}  `
                    : ''
                }
              />
            }
            keyboardType="numeric"
            returnKeyType="send"
            error={touched.phone && errors.phone}
            onChangeText={handleChange('phone')}
            onSubmitEditing={() =>
              showPasswordInput
                ? passwordInputRef.current.focus()
                : handleSubmit()
            }
            onFocus={() =>
              setFieldValue('phone', removePhoneMask(values.phone))
            }
            onBlur={() => {
              setFieldValue('phone', addPhoneMask(values.phone), true);
            }}
            value={values.phone}
          />
          <HelperText type={touched.phone && errors.phone ? 'error' : 'info'}>
            {errors.phone ? errors.phone : t('your-phone-must-have-11-digits')}
          </HelperText>
          {showPasswordInput && (
            <>
              <StyledTextInput
                label={t('password')}
                mode="outlined"
                ref={passwordInputRef}
                onSubmitEditing={() => confirmPasswordInputRef.current.focus()}
                textContentType="newPassword"
                error={touched.password && errors.password}
                autoCorrect={false}
                secureTextEntry
                returnKeyType="next"
                autoCapitalize="none"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
              />
              <HelperText
                type="error"
                visible={!!(touched.password && errors.password)}
              >
                {errors.password}
              </HelperText>
              <StyledTextInput
                label={t('confirm-password')}
                mode="outlined"
                ref={confirmPasswordInputRef}
                onSubmitEditing={handleSubmit}
                error={touched.confirmPassword && errors.confirmPassword}
                textContentType="newPassword"
                autoCorrect={false}
                secureTextEntry
                returnKeyType="send"
                autoCapitalize="none"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword')}
              />
              <HelperText
                type="error"
                visible={!!(touched.confirmPassword && errors.confirmPassword)}
              >
                {errors.confirmPassword}
              </HelperText>
            </>
          )}
          {renderSubmit({ handleSubmit, isValid })}
        </>
      )}
    </Formik>
  );
};

ProfileEditor.propTypes = {
  emailInputEnabled: PropTypes.bool.isRequired,
  showPasswordInput: PropTypes.bool.isRequired,
  showEmailInput: PropTypes.bool,
  onUpdateDataPress: PropTypes.func.isRequired,
  renderSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    preferredName: PropTypes.string,
    email: PropTypes.string,
    company: PropTypes.string,
    phone: PropTypes.string,
    country: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
  scrollContainer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  enableContainerScroll: PropTypes.func,
  isScrollInContainerEnabled: PropTypes.bool,
};

ProfileEditor.defaultProps = {
  scrollContainer: <></>,
  enableContainerScroll: () => {},
  isScrollInContainerEnabled: true,
  showEmailInput: true,
};

export default ProfileEditor;
