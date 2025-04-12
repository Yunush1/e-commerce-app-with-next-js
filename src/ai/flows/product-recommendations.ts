'use server';
/**
 * @fileOverview Provides personalized product recommendations based on browsing history.
 *
 * - getProductRecommendations - A function that returns product recommendations.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  browsingHistory: z
    .array(z.string())
    .describe('An array of product IDs representing the user browsing history.'),
  numberOfRecommendations: z
    .number()
    .default(5)
    .describe('The number of product recommendations to return.'),
});
export type ProductRecommendationsInput = z.infer<
  typeof ProductRecommendationsInputSchema
>;

const ProductRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of product IDs that are recommended to the user.'),
});
export type ProductRecommendationsOutput = z.infer<
  typeof ProductRecommendationsOutputSchema
>;

export async function getProductRecommendations(
  input: ProductRecommendationsInput
): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {
    schema: z.object({
      browsingHistory: z
        .array(z.string())
        .describe('An array of product IDs representing the user browsing history.'),
      numberOfRecommendations: z
        .number()
        .describe('The number of product recommendations to return.'),
    }),
  },
  output: {
    schema: z.object({
      recommendations: z
        .array(z.string())
        .describe('An array of product IDs that are recommended to the user.'),
    }),
  },
  prompt: `You are a product recommendation expert for an e-commerce website.
Based on the user's browsing history, provide a list of product IDs that the user might be interested in.
The user wants {{numberOfRecommendations}} recommendations.

Browsing History: {{browsingHistory}}

Recommendations:`,
});

const productRecommendationsFlow = ai.defineFlow<
  typeof ProductRecommendationsInputSchema,
  typeof ProductRecommendationsOutputSchema
>({
  name: 'productRecommendationsFlow',
  inputSchema: ProductRecommendationsInputSchema,
  outputSchema: ProductRecommendationsOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});

