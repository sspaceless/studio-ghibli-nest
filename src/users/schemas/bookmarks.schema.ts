import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Bookmarks {
  @Prop()
  favorite: string[];

  @Prop()
  watched: string[];

  @Prop()
  watchLater: string[];
}

export type BookmarksDocument = Bookmarks & Document;
export default Bookmarks;
