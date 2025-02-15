export class NonExistentException extends Error {
  constructor(path: string) {
    super(`The ${path} does not exist in state`)
  }
}

export class NonStorageInstanceException extends Error {
  constructor() {
    super(`Storage instance should be initialized`)
  }
}

export class UnexpectedTypeException extends Error {
  constructor(type: string) {
    super(`Unexpected type: ${type} in storage`)
  }
}

export class UnexpectedMarkException extends Error {
  constructor(mark: string) {
    super(`Unexpected mark: ${mark} in storage`)
  }
}

export class UnexpectedParamsException extends Error {
  constructor(params: string) {
    super(`Unexpected params with ${params} when calling deserialize`)
  }
}

export class NoSchemaException extends Error {
  constructor(type: string) {
    super(`No schema setting with ${type}`)
  }
}

export class NonExistentCellException extends Error {
  constructor(outPoint: string) {
    super(`${outPoint} cell is not exist in store`)
  }
}

export class UnmatchLengthException extends Error {
  constructor(type: string, actual: number, expected: number) {
    super(`Actual length is ${actual}, but expected length is ${expected} in ${type}`)
  }
}

export class UnexpectedSchemaOptException extends Error {
  constructor() {
    super(`Unexpected schema options without object`)
  }
}
