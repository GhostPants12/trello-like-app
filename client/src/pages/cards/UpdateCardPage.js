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
import { Link as LinkRouter, useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import CardService from '../../services/CardService';

const theme = createTheme();

export const UpdateCardPage = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const boardId = useParams().boardId;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    CardService.putCard(
      id,
      data.get('name'),
      data.get('description'),
    ).then(() => navigate('/b/' + boardId));
  };

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
            Update Card
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Card
            </Button>
          </Box>
        </Container>
      </Box>
    </main>
  );
};
