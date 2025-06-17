import InvariantError from "../../exceptions/InvariantError.js";
import { albumPayloadSchema, songPayloadSchema } from "./schema.js";

const AlbumValidator = {
  validationAlbumPayload: (payload) => {
    const validationResult = albumPayloadSchema.validate(payload);
    
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
}

const SongValidator = {
  validationSongPaylod: (payload) => {
    const validationResult = songPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
}

export { AlbumValidator, SongValidator };