import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import TableChartIcon from '@mui/icons-material/TableChart';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BoardService from '../../services/BoardService';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';

const theme = createTheme();

export class BoardsPage extends React.Component {
  async getData() {
    const boards = await BoardService.getBoards();
    return boards;
  }

  constructor(...args) {
    super(...args);
    this.state = { data: null };
  }

  componentDidMount() {
    if (!this.state.data) {
      (async () => {
        try {
          this.setState({ data: await this.getData() });
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }

  render() {
    return (
      <main>
        {/* Hero unit */}
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
              Boards
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Here you can check out your boards!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <LinkRouter to="b/create">
                <Button variant="contained">Create new board</Button>
              </LinkRouter>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {this.state.data == null ? (
              <em>Loading...</em>
            ) : (
              this.state.data.map((card) => (
                <Grid item key={card.id} xs={12} sm={4} md={3}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <LinkRouter to={'b/' + card.id}>
                        <Button size="small">View</Button>
                      </LinkRouter>
                      <LinkRouter to={'b/update/' + card.id}>
                        <Button size="small">Edit</Button>
                      </LinkRouter>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </main>
    );
  }
}
