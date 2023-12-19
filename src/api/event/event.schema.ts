import z from "zod";

export const createEventSchema = z.object({
  name: z.string(),
  time: z.string().refine((val) => {
    return new Date(val).getTime() > Date.now();
    }),
  venue: z.string(),
  themeColor: z.string(),
//   rsvp: z.boolean().optional(),
//   maxRSVP: z.number().min(0).optional(),
//   rsvpMailHoursBefore: z.number().min(0).optional(),
});
