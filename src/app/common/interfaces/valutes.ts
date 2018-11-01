export interface Valutes {
  Date: String;
  PreviousDate: String;
  PreviousURL: String;
  Timestamp: String;
  Valute: {
    USD: {
      ID: String;
      NumCode: String;
      CharCode: String;
      Nominal: Number;
      Name: String;
      Value: Number;
      Previous: Number;
    },
    EUR: {
      ID: String;
      NumCode: String;
      CharCode: String;
      Nominal: Number;
      Name: String;
      Value: Number;
      Previous: Number;
    }
  };
}
