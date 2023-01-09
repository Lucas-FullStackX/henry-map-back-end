export type ContextType = {
  token: string;
};
export type UserResponse = {
  id: string;
  name: string;
  email: string;
};
export type RoadMapResponse = {
  id: string;
  name: string;
  category?: {
    id: string;
    name: string;
  } | null;
  visible: boolean;
  node_custom_fields: any[];
  relation_custom_fields: any[];
  user: UserResponse | null;
};
export type CategoryResponse = {
  id: string;
  name: string;
  roadMapsList: RoadMapResponse[];
};
