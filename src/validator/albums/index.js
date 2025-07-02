import InvariantError from "../../exceptions/InvariantError.js";
import albumPayloadSchema from "./schema.js";

const AlbumsValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = albumPayloadSchema.validate(payload);
    
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
}

export default AlbumsValidator;