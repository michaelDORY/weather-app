import { Box, Card, CardContent, CardHeader, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import AddCityForm from '../AddCityForm'
import CardList from '../CardList'

const MainPage = () => {
  return (
    <Box>
      <Container>
        <Stack>
          <AddCityForm />
        </Stack>
        <CardList>
          <Card>
            <CardHeader>
              <Typography>Hello</Typography>
            </CardHeader>
            <CardContent>
              <Typography>Nice</Typography>
            </CardContent>
          </Card>
        </CardList>
      </Container>
    </Box>
  )
}

export default MainPage
