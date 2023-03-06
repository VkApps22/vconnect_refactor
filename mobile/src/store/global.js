export const pendingSelector = (state) => ({
  pending:
    (state.auth && state.auth.pending) ||
    (state.forgotPassword && state.forgotPassword.pending),
});
