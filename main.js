/**
 * Нужно написать функцию для разбивки текста на фрагменты.
1. Функция принимает на вход текст, написанный латиницей, где все слова
разделены только 1 пробелом. Текст содержит в себе только латинские буквы и
пробелы (без знаков препинания).
2. Задача функции разбить текст на СМСки размером не больше 140 символов и
вернуть в результате массив получившихся строк.
3. Так как СМСки платные важно разбить текст на минимальное количество
фрагментов.
4. Слова нельзя разбивать посередине, то есть текст нужно разбить строго по
пробелам.
5. Если весь текст не помещается в один фрагмент то каждый фрагмент должен
заканчиваться суффиксом ' k/n', где k - порядковый номер фрагмента, n -
количество фрагментов, на которые разбит текст. k <= n <= 9999.
6. Суффикс учитывается при подсчете длины СМСки, то есть длина фрагмента
вместе с суффиксом должна быть меньше или равна 140 символам.
7. Задача решаема, то есть в тексте не может быть настолько длинных слов, чтобы
одно слово с суффиксом не уместилось в одном СМС.
 */

const SMS_LENGTH = 140;

const text = ' ';

const FORMAT_REGEX = /^[a-zA-Z\s]+$/;

const AVG_SUFFIX_LENGTH = 4;

const smsArray = toSMSArray(text);


//------------------------------------------------------------------------------

function toSMSArray(smsText) {
  if (!FORMAT_REGEX.test(smsText)) {
    throw new Error('Invalid input text');
  }

  if (smsText.length <= SMS_LENGTH) {
    return [smsText];
  }

  const smsWordArray = smsText.split(' ');
  const smsCountPredict = Math.round(smsText.length / (SMS_LENGTH - AVG_SUFFIX_LENGTH));

  return joinWordToPartWithSuffix(
    smsWordArray.reverse(),
    SMS_LENGTH,
    smsCountPredict,
    smsText
  );
}

function joinWordToPartWithSuffix(
  wordArray,
  partLength,
  countPredict,
  fullText
) {
  let currentPartIndex = 0;
  const newPartMetaArray = [
    {
      startIndex: 0,
      lastIndex: 0,
      length: 0,
      predictSuffix: `${currentPartIndex + 1}/${countPredict + 1}`,
    },
  ];

  for (let index = wordArray.length - 1; index > -1; index--) {
    const lastPart = newPartMetaArray[currentPartIndex];
    const wordLength = wordArray[index].length + 1;
    const newLastPartLenght =
      lastPart.length + wordLength + lastPart.predictSuffix.length;

    if (newLastPartLenght <= partLength) {
      lastPart.lastIndex = index;
      lastPart.length += wordLength;
    } else {
      currentPartIndex++;
      newPartMetaArray.push({
        startIndex: index,
        lastIndex: index,
        length: wordLength,
        predictSuffix: `${currentPartIndex + 1}/${countPredict + 1}`,
      });
    }
  }

  return currentPartIndex == countPredict
    ? splitTextToPartWithSuffix(fullText, newPartMetaArray)
    : joinWordToPartWithSuffix(
        wordArray,
        partLength,
        currentPartIndex,
        fullText
      );
}

function splitTextToPartWithSuffix(fullText, partMetaArray) {
    let textPartStartIndex = 0;
    return partMetaArray.map((partMeta) => {
      const textPart =
        fullText.substr(textPartStartIndex, partMeta.length - 1) +
        ' ' +
        partMeta.predictSuffix;
      textPartStartIndex += partMeta.length;
      return textPart;
    });
  }
