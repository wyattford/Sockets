package edu.bothellcs.sockets;

import java.util.Arrays;

class Functions {
  public static String compareStrings(String string1, String string2) {
    int[] buildArray = new int[string1.length()];
    String[] firstWord = string1.toLowerCase().split("");
    String[] secondWord = string2.toLowerCase().split("");
    for (int i = 0; i < firstWord.length; i++) {
      if (firstWord[i].equals(secondWord[i])) {
        buildArray[i] = 2;
      } else if (searchArray(firstWord[i], secondWord) != -1) {
        buildArray[i] = 1;
      } else {
        buildArray[i] = 0;
      }
    }
    return arrayToString(buildArray);
  }

  public static String arrayToString(int[] input) {
    String returnVal = "";
    for (int num : input) {
      returnVal+=num;
    }
    return returnVal;
  }

  public static int searchArray(String searchTerm, String[] array) {
    return Arrays.asList(array).indexOf(searchTerm);
  }
}