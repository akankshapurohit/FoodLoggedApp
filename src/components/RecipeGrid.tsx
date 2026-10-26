import {
  Grid,
  Card,
  CardContent,
  Box,
  Skeleton,
  Typography,
} from "@mui/material";
import { Recipe } from "../features/recipes/types/recipe";
import { RecipeCard } from "./RecipeCard";

interface RecipeGridProps {
  recipes: Recipe[];
  loading: boolean;
  onSelectRecipe: (recipe: Recipe) => void;
}

export const RecipeGrid = ({
  recipes,
  loading,
  onSelectRecipe,
}: RecipeGridProps) => {
  // Skeleton placeholders array for the initial loading phase
  if (loading) {
    return (
      <Grid container spacing={3}>
        {Array.from(new Array(8)).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{ height: 340, display: "flex", flexDirection: "column" }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height={180}
                animation="wave"
              />
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Skeleton
                  variant="text"
                  width="80%"
                  height={28}
                  sx={{ mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  height={20}
                  sx={{ mb: 2 }}
                />
                <Skeleton variant="text" width="60%" height={18} />
                <Skeleton variant="text" width="50%" height={18} />
              </CardContent>
              <Box p={2} pt={0}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={36}
                  sx={{ borderRadius: 2 }}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (recipes.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h6" color="text.secondary">
          No recipes found matching the current layout parameters.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {recipes.map((recipe) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
          <RecipeCard recipe={recipe} onSelect={onSelectRecipe} />
        </Grid>
      ))}
    </Grid>
  );
};
