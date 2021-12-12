import React, { useEffect, useState } from 'react';
import { Link as LinkRouter, useNavigate, useParams } from 'react-router-dom';
import BoardService from '../../services/BoardService';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Chip, Divider } from '@mui/material';
import ListService from '../../services/ListService';

export const ListPage = () => {
  const [list, setList] = useState(null);
  const id = useParams().id;
  const navigate = useNavigate;

  useEffect(async () => {
    const result = await ListService.getList(id);
    console.log(result);
    setList(result);
    console.log(list);
  }, [setList]);

  return (
    <main>
      {!list ? (
        <h1>Loading..</h1>
      ) : (
        <div>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                {list.name}
              </Typography>
            </Container>
            <Container>
              <Box sx={{ my: 3, mx: 2 }}>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Cards:
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <LinkRouter to="c/create">
                    <Button variant="contained">Create new card</Button>
                  </LinkRouter>
                </Stack>
                <Container sx={{ py: 8 }} maxWidth="md">
                  {/* End hero unit */}
                  <Grid container spacing={4}>
                    {list.cards == null ? (
                      <em>Loading...</em>
                    ) : (
                      list.cards.map((card) => (
                        <Grid item key={card.id} xs={12} sm={4} md={6}>
                          <Card
                            sx={{
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                            <CardContent sx={{ flexGrow: 1 }}>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                              >
                                {card.name}
                              </Typography>
                              <Typography>{card.description}</Typography>
                            </CardContent>
                            <CardActions>
                              <LinkRouter to={'c/' + card.id}>
                                <Button size="small">View</Button>
                              </LinkRouter>
                              <LinkRouter to={'c/update/' + card.id}>
                                <Button size="small">Edit</Button>
                              </LinkRouter>
                              <LinkRouter to={'c/updateList/' + card.id}>
                                <Button size="small">Move to</Button>
                              </LinkRouter>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))
                    )}
                  </Grid>
                </Container>
              </Box>
            </Container>
          </Box>
        </div>
      )}
    </main>
  );
};
