
type CustomerRequest = {
  id: number;
  name: string;
  group_size: number;
  created_at: string;
  preferred_time: string;
  notes: string;
  preferred_cuisines: string[];
  preferred_vibes: string[];
  budget_lower: number;
  budget_upper: number;
}

export {type CustomerRequest};