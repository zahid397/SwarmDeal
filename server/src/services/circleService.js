class CircleService {
  async createPaymentIntent(amount) {
    return { id: `pi_${Date.now()}`, amount, status: 'simulated', isMock: true };
  }
}
export default new CircleService();
