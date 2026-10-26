import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Button,
  Chip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Recipe } from "../features/recipes/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
}

export const RecipeCard = ({ recipe, onSelect }: RecipeCardProps) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={recipe.image}
          alt={recipe.name}
          sx={{ objectFit: "cover" }}
        />
        <Chip
          label={recipe.difficulty}
          size="small"
          color={
            recipe.difficulty === "Easy"
              ? "success"
              : recipe.difficulty === "Medium"
                ? "warning"
                : "error"
          }
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2, pb: 1 }}>
        <Typography
          variant="h6"
          component="h2"
          noWrap
          sx={{ fontSize: "1.1rem", mb: 0.5, fontWeight: 600 }}
        >
          {recipe.name}
        </Typography>

        <Box display="flex" alignItems="center" mb={1.5}>
          <Rating value={recipe.rating} precision={0.1} readOnly size="small" />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ ml: 0.5, fontWeight: 500 }}
          >
            {recipe.rating}
          </Typography>
        </Box>

        <Box display="flex" gap={2} mb={1}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <LocalFireDepartmentIcon fontSize="small" color="action" />
            <Typography variant="body2">
              {recipe.caloriesPerServing} kcal
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <AccessTimeIcon fontSize="small" color="action" />
            <Typography variant="body2">
              {recipe.cookTimeMinutes + recipe.prepTimeMinutes} mins
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <Box p={2} pt={0}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="medium"
          onClick={() => onSelect(recipe)}
        >
          View Detailed Recipe
        </Button>
      </Box>
    </Card>
  );
};
