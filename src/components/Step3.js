import React from 'react';
import { useHistory } from 'react-router-dom';

import { MainContainer } from './MainContainer';
import { PrimaryButton } from './PrimaryButton';
import { Form } from './Form';

import { Typography } from '@material-ui/core';
import { FileInput } from './FileInput';
import { useForm } from 'react-hook-form';

export const Step3 = () => {
  const history = useHistory();
  const { control, handleSubmit } = useForm();
  const onSubmit = () => {
    history.push('./result')
  }
  
  return (
    <MainContainer>
      <Typography component='h2' variant='h5'>
        Step 3
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FileInput name='files' control={control} />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
}