import { Tag } from "./tag.model";
import { User } from "./user.model";

export interface Picture {
  id: string;
  fileName: string;
  storageName: string;
  user: User;
  tags: Tag[];
}
