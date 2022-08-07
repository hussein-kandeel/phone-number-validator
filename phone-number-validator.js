#!/usr/bin/env node
// The line above just for compiling the file to be standalone executable

function telephoneCheck(str) {
    // Copy str.
    let phoneNum = str;
    // Get the length of the number.
    let numLen = phoneNum.length;
    // Check the length.
    if (numLen > 16) {
        return false;
    } else {
        // Create placeholder to filter the number into it.
        let filteredPhoneNum = "";
        // Loop for each character in phoneNum in order to filter out '(' and ')'.
        for (let i = 0; i < numLen; i++) {
            // Check for close ')' if there is an open '('.
            if (phoneNum[i] == '(' && phoneNum[i + 4] != ')') {
                return false;
            } else if (phoneNum[i] == ')' && phoneNum[i - 4] != '(') {
                return false;
            } else if (phoneNum[i] != '(' && phoneNum[i] != ')') {
                // Filter out the '(' and ')' from the number.
                filteredPhoneNum += phoneNum[i];
            }
        }
        // Change phoneNum into the current state and clear the filteration placeholder.
        phoneNum = filteredPhoneNum;
        filteredPhoneNum = "";
        // Get the length of the number at the current state.
        numLen = phoneNum.length;

        // check for the countery code
        let REGEX = /\d/;
        let numsOnly = "";
        for (let i = 0; i < numLen; i++) {
            if (REGEX.test(phoneNum[i])) {
                numsOnly += phoneNum[i];
            }
        }
        if (numsOnly.length == parseInt(11, 10)) {
            if (numsOnly[0] != parseInt(1, 10)) {
                return false;
            } else {
                // Filter out the countery code if it is correct.
                for (let i = 1; i < numLen; i++) {
                    if (i == parseInt(1, 10) && phoneNum[i] == ' '){
                        continue;
                    } else {
                        filteredPhoneNum += phoneNum[i];
                    }
                }
                // Change phoneNum into the current state and clear the filteration placeholder.
                phoneNum = filteredPhoneNum;
                filteredPhoneNum = "";
                // Get the length of the number at the current state.
                numLen = phoneNum.length;
            }
        }

        // Check for only 10 numbers
        if (numLen == parseInt(10, 10)){
            numsOnly = "";
            for (let i = 0; i < numLen; i++) {
                if (REGEX.test(phoneNum[i])){
                    numsOnly += phoneNum[i];
                }
            }
            if (numsOnly.length == parseInt(10, 10)) {
                return true;
            } else {
                return false;
            }
        } else {
            // Check for ' ' and '-'.
            if (numLen == parseInt(11, 10)) {
                if (phoneNum[3] == ' ' || phoneNum[3] == '-') {
                    return true;
                } else if (phoneNum[6] == ' ' || phoneNum[6] == '-') {
                    return true;
                } else {
                    return false;
                }
            } else if (numLen == 12) {
                if ((phoneNum[3] == ' ' || phoneNum[3] == '-') && (phoneNum[7] == ' ' || phoneNum[7] == '-')) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
}


// TESTS
console.log(`telephoneCheck("555 555-5555") should return true.`);
console.log(`Returning... => ${telephoneCheck("555 555-5555")}`);
console.log(``);
console.log(`telephoneCheck("1 (555) 555-5555") should return true.`);
console.log(`Returning... => ${telephoneCheck("1 (555) 555-5555")}`);
console.log(``);
console.log(`telephoneCheck("5555555555") should return true.`);
console.log(`Returning... => ${telephoneCheck("5555555555")}`);
console.log(``);
console.log(`telephoneCheck("(555)555-5555") should return true.`);
console.log(`Returning... => ${telephoneCheck("(555)555-5555")}`);
console.log(``);
console.log(`telephoneCheck("1(555)555-5555") should return true.`);
console.log(`Returning... => ${telephoneCheck("1(555)555-5555")}`);
console.log(``);
console.log(`telephoneCheck("1 555)555-5555") should return false.`);
console.log(`Returning... => ${telephoneCheck("1 555)555-5555")}`);
console.log(``);
console.log(`telephoneCheck("555)-555-5555") should return false.`);
console.log(`Returning... => ${telephoneCheck("555)-555-5555")}`);
console.log(``);
console.log(`telephoneCheck("(555)5(55?)-5555") should return false.`);
console.log(`Returning... => ${telephoneCheck("(555)5(55?)-5555")}`);
console.log(``);

