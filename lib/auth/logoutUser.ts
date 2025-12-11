export function logoutUser() {
  document.cookie = "binntech_token=; Max-Age=0; path=/;";
  window.location.href = "/auth/login";
}
