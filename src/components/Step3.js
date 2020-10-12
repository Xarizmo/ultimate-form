import React from 'react';
import { useHistory } from 'react-router-dom';

import { MainContainer } from './MainContainer';
import { PrimaryButton } from './PrimaryButton';
import { Form } from './Form';

import { Typography } from '@material-ui/core';
import { FileInput } from './FileInput';
import { useForm } from 'react-hook-form';
import { useData } from '../DataContext';

export const Step3 = () => {
  const history = useHistory();
  const {data, setValues} = useData();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      files: data.files
    }
  });
  const onSubmit = (data) => {
    history.push('./result')
    setValues(data);
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