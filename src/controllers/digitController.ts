import axios from 'axios';

class DigitController {
  url = 'http://localhost:3333/digits'
  async getAllDigits() {
    return (await (axios.get(this.url))).data;
  }

  async createNewDigitString(digit: number) {
    console.log(digit);
    
    return (await (axios.post(this.url, { digit }))).data;
  }
}

export const digitController = new DigitController();