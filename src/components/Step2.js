import React from 'react';
import { useHistory } from 'react-router-dom';

import { MainContainer } from './MainContainer';
import { Form } from './Form';
import { Input } from './Input';
import { PrimaryButton } from './PrimaryButton';

import { Typography } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email should have correct format')
    .required('Email is a required field')
});

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value)
  
  if(!phoneNumber){
    return value
  }
  
  return (
    phoneNumber.formatInternational()
  )
}

export const Step2 = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, watch } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })
  
  // watch будет автоматически обновлять значение константы hasPhone
  const hasPhone = watch('hasPhone')
  
  const onSubmit = () => {
    history.push('/step3')
  }
  
  return (
    <MainContainer>
      <Typography
        component='h2'
        variant='h5'
      >
        Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id='email'
          type='email'
          label='Email'
          name='email'
          required
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <FormControlLabel
          control={
            <Checkbox name='hasPhone' inputRef={register} color='primary'/>
          }
          label='Do you have a phone'
        />
        
        {
          hasPhone && (
            <Input
              ref={register}
              id='phoneNumber'
              type='tel'
              label='Phone number'
              name='phoneNumber'
              onChange={e => {
                e.target.value = normalizePhoneNumber(e.target.value)
              }}
            />
          )
        }
        
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
}