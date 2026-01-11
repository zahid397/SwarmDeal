import { ethers } from 'ethers';

class ArcService {
  async verifySignature(message, signature, expectedAddress) {
    try {
      const recovered = ethers.verifyMessage(message, signature);
      return { verified: recovered.toLowerCase() === expectedAddress.toLowerCase() };
    } catch {
      return { verified: false };
    }
  }
}
export default new ArcService();
