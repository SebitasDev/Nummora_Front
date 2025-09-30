import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  celo,
  celoAlfajores,
  kairos,
  liskSepolia,
  somniaTestnet,
} from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { http } from "wagmi";

export const WalletConnection = () => {
  const projectId = "62c66ed4cd07119457a08ddce0d80464";

  const wagmiAdapter = new WagmiAdapter({
    networks: [celo, somniaTestnet, liskSepolia],
    transports: {
      [celo.id]: http( celo.rpcUrls.default.http[0] ),
      [celoAlfajores.id]: http(celoAlfajores.rpcUrls.default.http[0]),
      [somniaTestnet.id]: http(somniaTestnet.rpcUrls.default.http[0]),
      [liskSepolia.id]: http(liskSepolia.rpcUrls.default.http[0]),
      [kairos.id]: http(kairos.rpcUrls.default.http[0]),
    },
    projectId,
    autoConnect: true,
  });

  const modal = createAppKit({
    adapters: [wagmiAdapter],
    networks: [celo, celoAlfajores, somniaTestnet, liskSepolia, kairos],
    projectId,
    metadata: {
      name: "Lender Dashboard",
      description: "Dashboard para prestamistas",
      url: "https://lender-dashboard.com",
      icons: ["https://lender-dashboard.com/icon.png"],
    },
    themeMode: "dark",
    themeVariables: {
      "--w3m-font-family": "Inter, sans-serif",
      "--w3m-accent": "#1976d2",
    },
    features: {
      analytics: false,
      connectFirstChain: false,
    },
  });

  return {
    wagmiAdapter,
    modal,
  };
};
