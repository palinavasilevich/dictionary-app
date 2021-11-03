import IBookmark from "@/types/IBookmark";
import IDefinitions from "@/types/IDefinitions";

export interface WordState {
  bookmarks: IBookmark;
  definitions: IDefinitions[];
  error: string;
  isLoading: boolean;
}
