import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PublicIcon from "@mui/icons-material/Public";
import { Recipe } from "../features/recipes/types/recipe";

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
}

export const RecipeDetailModal = ({
  recipe,
  open,
  onClose,
}: RecipeDetailModalProps) => {
  if (!recipe) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="body"
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ fontWeight: 700, pr: 6, fontSize: "1.5rem" }}>
        {recipe.name}
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Recipe Media Block */}
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src={recipe.image}
              alt={recipe.name}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: 1,
                objectFit: "cover",
              }}
            />

            <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
              {recipe.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Box>
          </Grid>

          {/* Quick Metrics Matrix Grid */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocalFireDepartmentIcon color="primary" />
                  <Typography variant="body2">
                    Calories: <strong>{recipe.caloriesPerServing} kcal</strong>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTimeIcon color="primary" />
                  <Typography variant="body2">
                    Cook Time: <strong>{recipe.cookTimeMinutes} mins</strong>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <RestaurantIcon color="primary" />
                  <Typography variant="body2">
                    Servings: <strong>{recipe.servings} portions</strong>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <PublicIcon color="primary" />
                  <Typography variant="body2">
                    Cuisine: <strong>{recipe.cuisine}</strong>
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Ingredients Segment */}
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="text.primary"
              gutterBottom
            >
              Ingredients Matrix
            </Typography>
            <List dense disablePadding>
              {recipe.ingredients.map((ingredient, i) => (
                <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
                  <ListItemText
                    primary={`• ${ingredient}`}
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Step-by-Step Instructions Panel */}
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="text.primary"
              sx={{ mt: 1 }}
              gutterBottom
            >
              Preparation Instructions
            </Typography>
            <List component="ol" sx={{ listStyleType: "decimal", pl: 3 }}>
              {recipe.instructions.map((step, index) => (
                <Box
                  component="li"
                  key={index}
                  sx={{ display: "list-item", mb: 1 }}
                >
                  <Typography
                    variant="body2"
                    color="text.primary"
                    lineHeight={1.6}
                  >
                    {step}
                  </Typography>
                </Box>
              ))}
            </List>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" color="primary">
          Dismiss View
        </Button>
      </DialogActions>
    </Dialog>
  );
};
