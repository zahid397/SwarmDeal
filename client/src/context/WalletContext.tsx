'use client';
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
const { chains, publicClient } = configureChains([mainnet], [publicProvider()]);
const config = createConfig({
  autoConnect: true, publicClient, connectors: [new InjectedConnector({ chains })],
});
export function WalletProvider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
