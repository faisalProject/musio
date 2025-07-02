import InvariantError from "../../exceptions/InvariantError.js";
import songPayloadSchema from "./schema.js";

const SongValidator = {
  validateSongPayload: (payload) => {
    const validationResult = songPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
}

export default SongValidator;