import Joi from "joi";

const albumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().required()
})

export default albumPayloadSchema;