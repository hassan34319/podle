export function numberToWords(num) {
  const units = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  function convertNumber(num) {
    if (num < 10) return units[num];
    if (num >= 11 && num <= 19) return teens[num - 10];
    if (num >= 20 && num < 100) {
      const unitDigit = num % 10;
      return (
        tens[Math.floor(num / 10)] +
        (unitDigit > 0 ? `-${units[unitDigit]}` : "")
      );
    }
    // You can extend this function to handle larger numbers if needed
    return num.toString();
  }

  return convertNumber(num);
}
