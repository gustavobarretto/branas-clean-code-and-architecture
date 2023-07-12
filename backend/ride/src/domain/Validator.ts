// @ts-nocheck
export default class Validator {
  readonly DOCUMENT_CHARACTERS: number = 11;

  constructor(readonly document: string) {
    this.document = document;
  }

  validate() {
    if (!this.document) return false
    const documentNumbers = this.giveOnlyDocumentNumbers();
    if (!this.isTheRightQuantityOfNumbers(documentNumbers)) return false;
    if (this.isAllNumbersIdentical(documentNumbers)) return false;
    const numbersToValidate = documentNumbers.slice(0, -2).split("");
    const { firstSumOfDigits, secondSumOfDigits } = this.digitValidator(numbersToValidate);
    const firstDigitValidator = this.extractDigitValidator(firstSumOfDigits);
    const secondDigitValidator = this.extractDigitValidator(secondSumOfDigits + (2 * firstDigitValidator));
    return `${firstDigitValidator}${secondDigitValidator}` === documentNumbers.slice(9);
  }

  giveOnlyDocumentNumbers() {
    return this.document.match(/\d+/gm).join("")
  }

  private isTheRightQuantityOfNumbers(numbers: string) {
    return numbers.length === this.DOCUMENT_CHARACTERS;
  }

  private isAllNumbersIdentical(numbers: string) {
    const FIRST_CHARACTER = numbers[0]
    return numbers.split("").every(character => character === FIRST_CHARACTER);
  }

  private digitValidator(numbersToValidate: Array) {
    const validators = [11, 12]
    const sumWithValidators = validators
      .map(validator => numbersToValidate
        .reduce((accumulator, character, index) => accumulator + ((validator - ++index) * parseInt(character)), 0))
    return {
      firstSumOfDigits: sumWithValidators[0],
      secondSumOfDigits: sumWithValidators[1]
    }
  }

  private extractDigitValidator(finalSum: number) {
    return (finalSum % 11) < 2 ? 0 : 11 - (finalSum % 11)
  }
}


