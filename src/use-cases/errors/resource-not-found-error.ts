export class ResourceNotFoundError extends Error {
  constructor() {
    super(' ⚠️ Resource not found')
  }
}
// Erros pastes can be better
// can use one function to a lot of erros passing the msg by parametrer to constructor
