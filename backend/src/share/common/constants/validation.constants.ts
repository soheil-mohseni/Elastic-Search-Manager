export class ValidationConstraints {
    static readonly maxIntegerValue = 2147483646;
    static readonly pageLimit = 50;
    static readonly passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  }
  