import { useState, useEffect, useMemo } from "react";
import { Recipe, FilterState, DummyJsonResponse } from "../types/recipe";
import { API_CONFIG } from "../../../config/constants";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination & Filtering Local States
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = API_CONFIG.DEFAULT_LIMIT;

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    minRating: 0,
    maxCalories: 1000,
    maxCookTime: 120,
  });

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        setLoading(true);
        // We fetch a larger subset (e.g., limit=50) to demonstrate client-side filtering and pagination
        const response = await fetch(
          `${API_CONFIG.BASE_URL}${API_CONFIG.RECIPES_ENDPOINT}?limit=50`,
        );
        if (!response.ok)
          throw new Error("Network failure while fetching recipes.");

        const data: DummyJsonResponse = await response.json();
        setRecipes(data.recipes);
        setError(null);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllRecipes();
  }, []);

  // Performance-optimized client filtering
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = recipe.name
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());
      const matchesRating = recipe.rating >= filters.minRating;
      const matchesCalories = recipe.caloriesPerServing <= filters.maxCalories;
      const matchesCookTime = recipe.cookTimeMinutes <= filters.maxCookTime;
      return (
        matchesSearch && matchesRating && matchesCalories && matchesCookTime
      );
    });
  }, [recipes, filters]);

  // Client-Side Pagination Pipeline (Fulfills Pagination Requirement)
  const paginatedRecipes = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredRecipes.slice(start, start + itemsPerPage);
  }, [filteredRecipes, page, itemsPerPage]);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  // Reset page position to page 1 if filters change and invalidate range bounds
  useEffect(() => {
    setPage(1);
  }, [filters]);

  return {
    recipes: paginatedRecipes,
    loading,
    error,
    filters,
    setFilters,
    page,
    setPage,
    totalPages,
    totalCount: filteredRecipes.length,
  };
};
