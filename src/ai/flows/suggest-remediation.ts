'use server';
/**
 * @fileOverview An AI agent that suggests remediation steps for cloud security vulnerabilities.
 *
 * - suggestRemediation - A function that suggests remediation steps based on security alerts.
 * - SuggestRemediationInput - The input type for the suggestRemediation function.
 * - SuggestRemediationOutput - The return type for the suggestRemediation function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestRemediationInputSchema = z.object({
  securityAlerts: z.array(z.string()).describe('A list of security alerts from the cloud scan.'),
  cloudProvider: z.enum(['AWS', 'Azure', 'GCP']).describe('The cloud provider being scanned.'),
});
export type SuggestRemediationInput = z.infer<typeof SuggestRemediationInputSchema>;

const SuggestRemediationOutputSchema = z.object({
  remediationSuggestions: z.array(z.string()).describe('A list of remediation suggestions for the security alerts.'),
});
export type SuggestRemediationOutput = z.infer<typeof SuggestRemediationOutputSchema>;

export async function suggestRemediation(input: SuggestRemediationInput): Promise<SuggestRemediationOutput> {
  return suggestRemediationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRemediationPrompt',
  input: {
    schema: z.object({
      securityAlerts: z.array(z.string()).describe('A list of security alerts from the cloud scan.'),
      cloudProvider: z.string().describe('The cloud provider being scanned.'),
    }),
  },
  output: {
    schema: z.object({
      remediationSuggestions: z.array(z.string()).describe('A list of remediation suggestions for the security alerts.'),
    }),
  },
  prompt: `You are a cloud security expert. Given the following security alerts for {{{cloudProvider}}}, suggest remediation steps to address them:\n\n{% each securityAlerts %}- {{this}}\n{% endeach %}\n\nProvide actionable remediation suggestions with detailed steps to correct misconfigurations and improve security. Return the suggestions in a list.
`, // Using Handlebars `each` block
});

const suggestRemediationFlow = ai.defineFlow<
  typeof SuggestRemediationInputSchema,
  typeof SuggestRemediationOutputSchema
>({
  name: 'suggestRemediationFlow',
  inputSchema: SuggestRemediationInputSchema,
  outputSchema: SuggestRemediationOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
