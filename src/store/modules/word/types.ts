import IBookMark from "@/types/IBookmark";
import IWord from "@/types/Word";

export interface WordState {
  bookmarks: IBookMark[] | string;
  wordDetails: IWord[] | string;
  error: string;
  isLoading: boolean;
}
