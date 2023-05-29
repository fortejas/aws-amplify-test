import awsExports from "./aws-exports.js"

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === "[::1]" ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
)

const [
  localRedirectSignIn,
  productionRedirectSignIn,
] = awsExports.oauth.redirectSignIn.split(",")

const [
  localRedirectSignOut,
  productionRedirectSignOut,
] = awsExports.oauth.redirectSignOut.split(",")

// export const awsConfig = {
//   ...awsExports,
//   oauth: {
//     ...awsExports.oauth,
//     redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
//     redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
//   }
// }

export const awsConfig = awsExports