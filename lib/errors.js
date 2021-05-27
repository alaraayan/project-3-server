export class NotFound extends Error {
  constructor() {
    super()
    this.name = 'NotFound'
  }
}

export class NotValid extends Error {
  constructor() {
    super()
    this.name = 'NotValid'
  }
}

export class UnableToDelete extends Error {
  constructor() {
    super()
    this.name = 'UnableToDelete'
  }
}

export class UnableToUpdate extends Error {
  constructor() {
    super()
    this.name = 'UnableToUpdate'
  }
}

export class AlreadyExists extends Error {
  constructor() {
    super()
    this.name = 'AlreadyExists'
  }
}
