import React, { useContext, useEffect, useState } from 'react';
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
import { CardActionArea, Chip, Divider, Paper } from '@mui/material';
import ListService from '../../services/ListService';
import CommentService from '../../services/CommentService';
import TextField from '@mui/material/TextField';
import CardService from '../../services/CardService';
import { Context } from '../../index';

export const CardPage = () => {
  const [card, setCard] = useState(null);
  const id = useParams().id;
  const navigate = useNavigate;
  const { store } = useContext(Context);

  console.log(store);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    CommentService.postComment(id, data.get('name')).then(() => {});
    setCard(null);
  };

  useEffect(async () => {
    const result = await CardService.getCard(id);
    console.log(result);
    setCard(result);
    console.log(card);
  }, [setCard]);

  return (
    <main>
      {!card ? (
        <h1>Loading..</h1>
      ) : (
        <div>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid item xs={12} md={12}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    component="h1"
                    variant="h2"
                    color="text.primary"
                    gutterBottom
                  >
                    {card.name}
                  </Typography>
                  <Grid>
                    {card.labels && (
                      <Stack direction="row">
                        {card.labels.map((label, index) =>
                          index % 2 == 1 ? (
                            <Chip label={label.text} key={label.id} />
                          ) : (
                            <Chip
                              label={label.text}
                              key={label.id}
                              variant="outlined"
                            />
                          ),
                        )}
                        <LinkRouter to="labels">
                          <Chip variant="outlined" label="+ Add Label" />
                        </LinkRouter>
                      </Stack>
                    )}
                  </Grid>
                  <Typography variant="h5" color="text.secondary" paragraph>
                    {card.description}
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h3"
                    color="text.primary"
                    gutterBottom
                    align="center"
                  >
                    Comments
                  </Typography>
                  <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                      {card.comments.map((comment) => (
                        <Grid item key={comment.id} xs={12} sm={6} md={12}>
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
                                {comment.author.username}
                              </Typography>
                              <Typography>{comment.text}</Typography>
                              {store.user.username ===
                                comment.author.username && (
                                <div>
                                  <LinkRouter
                                    to={'comments/edit/' + comment.id}
                                  >
                                    <Button type="small">Edit</Button>
                                  </LinkRouter>
                                  <Button type="small">Delete</Button>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                      <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          component="form"
                          onSubmit={handleSubmit}
                          noValidate
                          align="center"
                          sx={{ mt: 1 }}
                        >
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            id="name"
                            label="Comment"
                            name="name"
                            autoComplete="name"
                            autoFocus
                          />
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            Add Comment
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Container>
                </CardContent>
              </Card>
            </Grid>
          </Container>
        </div>
      )}
    </main>
  );
};
