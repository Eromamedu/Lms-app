"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type SearchResult = {
  id: string;
  title: string;
  type: "course" | "lesson" | "assignment" | "announcement";
  url: string;
};

type SearchContextType = {
  search: string;
  setSearch: (value: string) => void;

  results: SearchResult[];
  setResults: (results: SearchResult[]) => void;

  loading: boolean;
  setLoading: (value: boolean) => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [search, setSearch] = useState("");

  const [results, setResults] = useState<SearchResult[]>([]);

  const [loading, setLoading] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        results,
        setResults,
        loading,
        setLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      "useSearch must be used inside SearchProvider"
    );
  }

  return context;
}