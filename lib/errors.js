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
export class UsernameExists extends Error {
  constructor() {
    super()
    this.name = 'UsernameExists'
  }
}
export class EmailExists extends Error {
  constructor() {
    super()
    this.name = 'EmailExists'
  }
}
export class PasswordsNotMatching extends Error {
  constructor() {
    super()
    this.name = 'PasswordsNotMatching'
  }
}
export class UserInfoMissing extends Error {
  constructor() {
    super()
    this.name = 'UserInfoMissing'
  }
}
