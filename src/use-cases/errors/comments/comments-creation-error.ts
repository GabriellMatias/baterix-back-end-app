export class CommentCreationError extends Error {
  constructor() {
    super('⚠️ Error occurred while creating the comment.')
  }
}
