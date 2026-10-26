// 1. The individual Recipe Object schema mapped exactly to the incoming API payload
export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

// 2. The core container footprint returned by the paginated DummyJSON endpoint
export interface DummyJsonResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

// 3. Application State schema for UI client filtering parameters
export interface FilterState {
  searchQuery: string;
  minRating: number;
  maxCalories: number;
  maxCookTime: number;
}
