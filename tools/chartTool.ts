import { z } from "zod";

const DataSchema = z.union([
  z.array(z.number()).describe("An array of numbers to be charted"),
  z
    .record(z.number())
    .describe("An object with string keys and number values to be charted"),
]);

const InputSchema = z.object({
  data: DataSchema.default([]).describe(
    "The data to be charted. Can be an array of numbers or an object with string keys and number values."
  ),
  assistantMessage: z
    .string()
    .optional()
    .default("")
    .describe(
      "The assistant message that may contain embedded data to be charted"
    ),
});

export const chartTool = {
  chartable_data: {
    description:
      "Detects linear chartable data in the response with data, only detects linear chartable data",
    parameters: InputSchema,
    execute: async (input: z.infer<typeof InputSchema>) => {
      const { data, assistantMessage } = InputSchema.parse(input);

      let chart_type = "";

      if (
        Array.isArray(data) &&
        data.every((item) => typeof item === "number")
      ) {
        chart_type = "line";
      } else if (
        typeof data === "object" &&
        Object.values(data).every((item) => typeof item === "number")
      ) {
        chart_type = "bar";
      }
      // ...

      //   if (assistantMessage) {
      //      use for chart type hints
      //   }

      return JSON.stringify({ data });
    },
  },
};
