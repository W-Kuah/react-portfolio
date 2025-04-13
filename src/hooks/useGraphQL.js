// src/hooks/useGraphQL.js
import { useCallback } from 'react';

export const useGraphQL = () => {
  const callQuery = useCallback(async (queryKey = {}) => {
    try {
      const response = await fetch('/.netlify/functions/graphql-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ queryKey })
      });

      if (!response.ok) throw new Error('Request failed');
      return await response.json();
    } catch (error) {
      console.error('GraphQL error:', error);
      throw error;
    }
  }, []);

  return { callQuery };
};