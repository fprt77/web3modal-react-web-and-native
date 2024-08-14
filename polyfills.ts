// ⚠️ Important: `@walletconnect/react-native-compat` needs to be imported before other `wagmi` packages.
// This is because it applies a polyfill necessary for the TextEncoder API.
import '@walletconnect/react-native-compat';
import 'fast-text-encoding';
import 'react-native-get-random-values';
import '@ethersproject/shims';
