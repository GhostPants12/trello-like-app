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
import {
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import CardService from '../../services/CardService';

export const BoardPage = () => {
  const [board, setBoard] = useState(null);
  const [list, setList] = useState(null);
  const [role, setRole] = useState(null);
  const [archiveId, setArchiveId] = useState(0);
  const id = useParams().id;
  const navigate = useNavigate;

  const moveCard = (cardId) => {
    CardService.moveCard(list, cardId).then(() => {
      BoardService.getBoard(id).then((result) => setBoard(result));
    });
  };

  useEffect(async () => {
    const result = await BoardService.getBoard(id);
    console.log(result);
    const role = await BoardService.getRole(id);
    console.log(role);
    setArchiveId(result.lists.find((list) => list.name === 'Archive').id);
    setBoard(result);
    setRole(role.rolename);
    console.log(board);
  }, [setBoard, setRole]);

  const handleChange = (event) => {
    setList(event.target.value);
  };

  return (
    <main>
      {!board ? (
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
                {board.name}
              </Typography>
              <Box sx={{ my: 3, mx: 2 }}>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Users:
                </Typography>
                <Grid>
                  {board.users == null ? (
                    <em>Loading...</em>
                  ) : (
                    <Stack direction="row">
                      {board.users.map((user, index) =>
                        index % 2 == 1 ? (
                          <Chip label={user.username} key={user.id} />
                        ) : (
                          <Chip
                            label={user.username}
                            key={user.id}
                            variant="outlined"
                          />
                        ),
                      )}
                    </Stack>
                  )}
                </Grid>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  {role === 'Admin' && (
                    <LinkRouter to="user">
                      <Button variant="outlined">Add User</Button>
                    </LinkRouter>
                  )}
                </Stack>
              </Box>
            </Container>
            <Container>
              <Box sx={{ my: 3, mx: 2 }}>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Lists:
                </Typography>
                {role !== 'Observer' && (
                  <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                  >
                    <LinkRouter to="l/create">
                      <Button variant="contained">Create new list</Button>
                    </LinkRouter>
                    <LinkRouter to={'l/' + archiveId}>
                      <Button>To Archive</Button>
                    </LinkRouter>
                  </Stack>
                )}
                <Container sx={{ py: 8 }} maxWidth="md">
                  {/* End hero unit */}
                  <Grid container spacing={4}>
                    {board.lists == null ? (
                      <em>Loading...</em>
                    ) : (
                      board.lists.map(
                        (card) =>
                          card.name !== 'Archive' && (
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
                                  {card.cards.map((c) => (
                                    <Card
                                      sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                      }}
                                      variant="outlined"
                                    >
                                      <CardContent sx={{ flexGrow: 1 }}>
                                        {role !== 'Observer' ? (
                                          <LinkRouter
                                            to={'l/' + card.id + '/c/' + c.id}
                                          >
                                            <Typography
                                              gutterBottom
                                              variant="h5"
                                              component="h2"
                                            >
                                              {c.name}
                                            </Typography>
                                          </LinkRouter>
                                        ) : (
                                          <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                          >
                                            {c.name}
                                          </Typography>
                                        )}
                                      </CardContent>
                                      {role !== 'Observer' && (
                                        <CardActions>
                                          <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">
                                              List
                                            </InputLabel>
                                            <Select
                                              labelId={c.id}
                                              id={c.id}
                                              value={list}
                                              label="List"
                                              onChange={handleChange}
                                            >
                                              {board.lists.map((list) => (
                                                <MenuItem value={list.id}>
                                                  {list.name}
                                                </MenuItem>
                                              ))}
                                            </Select>
                                          </FormControl>
                                          <Button
                                            size="small"
                                            onClick={() => {
                                              moveCard(c.id);
                                            }}
                                          >
                                            Move To
                                          </Button>
                                        </CardActions>
                                      )}
                                    </Card>
                                  ))}
                                </CardContent>
                                {role !== 'Observer' && (
                                  <CardActions>
                                    <LinkRouter to={'l/' + card.id}>
                                      <Button size="small">View</Button>
                                    </LinkRouter>
                                    <LinkRouter to={'l/update/' + card.id}>
                                      <Button size="small">Edit</Button>
                                    </LinkRouter>
                                  </CardActions>
                                )}
                              </Card>
                            </Grid>
                          ),
                      )
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
