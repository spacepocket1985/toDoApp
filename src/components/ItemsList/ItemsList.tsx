import * as React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { PokemonType } from '../../service/pokeApi';

export const ItemsList: React.FC<{ pockemons: PokemonType[] }> = React.memo(
  ({ pockemons }) => {
    const renderItems = pockemons.map((pockemon, index) => {
      return (
        <Card key={index}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={pockemon.img}
              alt="pockemon img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {pockemon.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
    });

    return (
      <Grid
        container
        spacing={2}
        size={5}
        sx={{
          m: 'auto',
          justifyContent: 'space-between',
          alignContent: 'center',
          flexWrap: 'wrap',
          borderRadius: 2,
          padding: 1,
        }}
      >
        {renderItems}
      </Grid>
    );
  }
);
