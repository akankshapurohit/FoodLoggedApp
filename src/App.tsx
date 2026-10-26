import { useState } from "react";
import { Layout } from "./components/Layout";
import { useRecipes } from "./features/recipes/hooks/useRecipes";
import { FilterPanel } from "./components/FilterPanel";
import { RecipeGrid } from "./components/RecipeGrid";
import { RecipeDetailModal } from "./components/RecipeDetailModal";
import { Recipe } from "./features/recipes/types/recipe";
import { Pagination, Box, Alert, Typography } from "@mui/material";

function App() {
  const {
    recipes,
    loading,
    error,
    filters,
    setFilters,
    page,
    setPage,
    totalPages,
  } = useRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <Layout>
      {/* Network Failure State Notification Banner */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Interactive Operational Filters */}
      <FilterPanel filters={filters} onChange={setFilters} />

      {/* Main Grid Deck */}
      <RecipeGrid
        recipes={recipes}
        loading={loading}
        onSelectRecipe={handleSelectRecipe}
      />

      {/* Footer Navigation Controls */}
      {!loading && totalPages > 1 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={5}
          flexDirection="column"
          gap={1}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            size="large"
            shape="rounded"
          />
          <Typography variant="caption" color="text.secondary">
            Page {page} of {totalPages}
          </Typography>
        </Box>
      )}

      {/* Detailed Dynamic Target Overlay Pane */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </Layout>
  );
}

export default App;
