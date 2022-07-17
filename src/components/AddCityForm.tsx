import { LoadingButton } from '@mui/lab'
import { Paper, Stack, TextField } from '@mui/material'
import React, { FC, FormEvent, memo, useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks'
import { setShouldBeAdded } from '../redux/reducers/citiesSlice'

const AddCityForm: FC = memo(() => {
  const [city, setCity] = useState<string | null>(null)
  const [value, setValue] = useState('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (city) {
      dispatch(setShouldBeAdded(city))
    }
  }, [city])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setValue('')
    setCity(value)
  }

  return (
    <Paper sx={{ paddingY: 4 }} elevation={24}>
      <form onSubmit={handleSubmit}>
        <Stack
          direction='row'
          spacing={2}
          justifyContent='center'
          alignItems='stretch'
          sx={{ paddingX: 5 }}
        >
          <TextField
            data-testid='addingCityInput'
            value={value}
            label='City'
            onChange={(e) => setValue(e.target.value)}
          />
          <LoadingButton variant='contained' type='submit' sx={{ whiteSpace: 'nowrap' }}>
            Add city
          </LoadingButton>
        </Stack>
      </form>
    </Paper>
  )
})

AddCityForm.displayName = 'AddCityForm'

export default AddCityForm
