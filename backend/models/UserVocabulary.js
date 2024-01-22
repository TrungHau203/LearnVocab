import mongoose, { ObjectId, Schema} from "mongoose";
const UserVocabulary = mongoose.model(
  "UserVocabulary",
  new Schema(
    {
      id: { type: ObjectId },
      user_id: {
        type: ObjectId,
        ref: "Users",
      },
      vocab_id: {
        type: ObjectId,
        ref: "Vocabularies",
      },
      proficiency: {
        type: Number,
        required: true,
      },
      word_answer: {
        type: [String],
      },
      answer_trans: {
        type: [String],
      },
    },
    { timestamps: true }
  )
);

export default UserVocabulary;
