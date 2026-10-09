// Use an explicit verification address first. Infer Coursera links only for
// 12-character uppercase codes containing both letters and numbers, like React's.
export function getCredentialVerificationUrl({ credentialId, verification }) {
  if (verification) return verification;
  const courseraCode = /^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9]{12}$/;
  return typeof credentialId === 'string' && courseraCode.test(credentialId)
    ? `https://www.coursera.org/account/accomplishments/verify/${credentialId}`
    : '';
}
